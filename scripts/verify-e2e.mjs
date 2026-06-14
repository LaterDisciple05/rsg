import "dotenv/config";
import { PrismaClient } from "../app/generated/prisma/index.js";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { unlink } from "node:fs/promises";
import { join } from "node:path";

const base = process.env.TEST_BASE ?? "http://127.0.0.1:3000";
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });
const stamp = Date.now();
const slug = `codex-e2e-${stamp}`;
const title = `Codex E2E ${stamp}`;
const results = [];
const cleanup = [];
let cookie = "";

function record(name, ok, detail = "") {
  results.push({ name, ok, detail });
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function forms(html) {
  return [...html.matchAll(/<form\b[\s\S]*?<\/form>/gi)].map((match) => match[0]);
}

function findForm(html, predicate, label) {
  const found = forms(html).find(predicate);

  if (!found) throw new Error(`Could not find form: ${label}`);

  return found;
}

function actionName(form) {
  const name = form.match(/name="(\$ACTION_ID_[^"]+)"/)?.[1];

  if (!name) throw new Error("Could not find server action field");

  return name;
}

async function page(path, useCookie = true) {
  const res = await fetch(`${base}${path}`, {
    headers: useCookie && cookie ? { cookie } : {},
    redirect: "manual",
  });
  const body = await res.text();

  return { res, body };
}

async function publicHomeIncludes(...needles) {
  const home = await page("/", false);

  assert(home.res.status === 200, `Homepage returned ${home.res.status}`);

  for (const needle of needles) {
    assert(home.body.includes(needle), `Homepage did not include ${needle}`);
  }
}

async function postAction(path, form, fields, files = [], useCookie = true) {
  const fd = new FormData();
  fd.append(actionName(form), "");

  for (const [key, value] of Object.entries(fields)) {
    if (value !== undefined && value !== null) fd.append(key, String(value));
  }

  for (const file of files) {
    fd.append(file.name, file.blob, file.filename);
  }

  const res = await fetch(`${base}${path}`, {
    method: "POST",
    body: fd,
    headers: useCookie && cookie ? { cookie } : {},
    redirect: "manual",
  });

  assert([303, 307].includes(res.status), `Expected redirect from ${path}, got ${res.status}`);

  return res.headers.get("location") ?? "";
}

async function run(name, fn) {
  try {
    await fn();
    record(name, true);
  } catch (error) {
    record(name, false, error?.message ?? String(error));
  }
}

try {
  await run("Real admin login form", async () => {
    const { body } = await page("/admin-login", false);
    const form = findForm(
      body,
      (candidate) =>
        candidate.includes('name="email"') && candidate.includes('name="password"'),
      "login"
    );
    const fd = new FormData();
    fd.append(actionName(form), "");
    fd.append("email", process.env.ADMIN_EMAIL ?? "admin@risingsunglobal.local");
    fd.append("password", process.env.ADMIN_PASSWORD ?? "ChangeMe@123");

    const res = await fetch(`${base}/admin-login`, {
      method: "POST",
      body: fd,
      redirect: "manual",
    });

    assert(res.status === 303 && res.headers.get("location") === "/admin", "Login did not redirect to /admin");
    cookie = (res.headers.get("set-cookie") ?? "").split(";")[0];
    assert(cookie.startsWith("rsg_admin_session="), "Login did not set admin session cookie");

    const admin = await page("/admin");
    assert(admin.res.status === 200 && admin.body.includes("Rising Sun Global CMS"), "Session did not open dashboard");
  });

  await run("Company profile save action reflects publicly", async () => {
    const original = await prisma.companyProfile.findUnique({ where: { id: "main" } });
    cleanup.push(async () => {
      if (original) {
        await prisma.companyProfile.update({
          where: { id: original.id },
          data: {
            name: original.name,
            about: original.about,
            mission: original.mission,
            vision: original.vision,
            email: original.email,
            phone: original.phone,
            whatsapp: original.whatsapp,
            linkedinUrl: original.linkedinUrl,
            address: original.address,
            city: original.city,
            country: original.country,
          },
        });
      } else {
        await prisma.companyProfile.delete({ where: { id: "main" } }).catch(() => {});
      }
    });

    const { body } = await page("/admin/company");
    const form = findForm(body, (candidate) => candidate.includes("Save Profile"), "company save");
    await postAction("/admin/company", form, {
      name: "Rising Sun Global",
      email: `${slug}@example.com`,
      phone: "+61 400 000 999",
      whatsapp: "+61 400 000 999",
      linkedinUrl: "https://www.linkedin.com/in/rahul-shah-707847147/",
      city: `${title} City`,
      country: "Australia",
      about: `${title} public about`,
      mission: `${title} public mission`,
      vision: `${title} public vision`,
      address: `${title} public address`,
    });

    await publicHomeIncludes(`${slug}@example.com`, `${title} public about`, `${title} public address`);
  });

  await run("Services add/delete actions reflect publicly", async () => {
    await prisma.service.deleteMany({ where: { slug: `${slug}-service` } });
    let current = await page("/admin/services");
    let form = findForm(
      current.body,
      (candidate) => candidate.includes("Add Service") && candidate.includes('name="title"'),
      "add service"
    );
    await postAction("/admin/services", form, {
      title: `${title} Service`,
      slug: `${slug}-service`,
      icon: "Scale",
      sortOrder: 9999,
      visibility: "PUBLIC",
      description: `${title} service body`,
    });
    const created = await prisma.service.findUnique({ where: { slug: `${slug}-service` } });
    assert(created, "Service was not created");
    await publicHomeIncludes(`${title} Service`, `${title} service body`);

    current = await page("/admin/services");
    form = findForm(
      current.body,
      (candidate) => candidate.includes(created.id) && candidate.includes("Delete"),
      "delete service"
    );
    await postAction("/admin/services", form, { id: created.id });
    assert(!(await prisma.service.findUnique({ where: { id: created.id } })), "Service was not deleted");
  });

  await run("Materials add/delete actions reflect publicly", async () => {
    await prisma.material.deleteMany({ where: { slug: `${slug}-material` } });
    let current = await page("/admin/materials");
    let form = findForm(
      current.body,
      (candidate) => candidate.includes("Add Material") && candidate.includes('name="title"'),
      "add material"
    );
    await postAction("/admin/materials", form, {
      title: `${title} Material`,
      slug: `${slug}-material`,
      sortOrder: 9999,
      visibility: "PUBLIC",
    });
    const created = await prisma.material.findUnique({ where: { slug: `${slug}-material` } });
    assert(created, "Material was not created");
    await publicHomeIncludes(`${title} Material`);

    current = await page("/admin/materials");
    form = findForm(
      current.body,
      (candidate) => candidate.includes(created.id) && candidate.includes("Delete"),
      "delete material"
    );
    await postAction("/admin/materials", form, { id: created.id });
    assert(!(await prisma.material.findUnique({ where: { id: created.id } })), "Material was not deleted");
  });

  await run("Projects add/delete actions reflect publicly", async () => {
    await prisma.project.deleteMany({ where: { slug: `${slug}-project` } });
    let current = await page("/admin/projects");
    let form = findForm(
      current.body,
      (candidate) => candidate.includes("Add Project") && candidate.includes('name="title"'),
      "add project"
    );
    await postAction("/admin/projects", form, {
      title: `${title} Project`,
      slug: `${slug}-project`,
      category: "E2E",
      countryId: "",
      industryId: "",
      status: "ACTIVE",
      visibility: "PUBLIC",
      featured: "on",
      description: `${title} project body`,
    });
    const created = await prisma.project.findUnique({ where: { slug: `${slug}-project` } });
    assert(created?.status === "ACTIVE", "Project was not created with status");
    await publicHomeIncludes(`${title} Project`, `${title} project body`);

    current = await page("/admin/projects");
    form = findForm(
      current.body,
      (candidate) => candidate.includes(created.id) && candidate.includes("Delete"),
      "delete project"
    );
    await postAction("/admin/projects", form, { id: created.id });
    assert(!(await prisma.project.findUnique({ where: { id: created.id } })), "Project was not deleted");
  });

  await run("Testimonials add/delete actions reflect publicly", async () => {
    let current = await page("/admin/testimonials");
    let form = findForm(
      current.body,
      (candidate) => candidate.includes("Add Testimonial") && candidate.includes('name="customerName"'),
      "add testimonial"
    );
    await postAction("/admin/testimonials", form, {
      customerName: `${title} Customer`,
      companyName: `${title} Co`,
      visibility: "PUBLIC",
      message: `${title} testimonial message`,
    });
    const created = await prisma.testimonial.findFirst({
      where: { customerName: `${title} Customer` },
      orderBy: { createdAt: "desc" },
    });
    assert(created, "Testimonial was not created");
    await publicHomeIncludes(`${title} Customer`, `${title} testimonial message`);

    current = await page("/admin/testimonials");
    form = findForm(
      current.body,
      (candidate) => candidate.includes(created.id) && candidate.includes("Delete"),
      "delete testimonial"
    );
    await postAction("/admin/testimonials", form, { id: created.id });
    assert(!(await prisma.testimonial.findUnique({ where: { id: created.id } })), "Testimonial was not deleted");
  });

  await run("Documents upload/delete actions", async () => {
    let uploadedPath = "";
    let current = await page("/admin/documents");
    let form = findForm(
      current.body,
      (candidate) => candidate.includes("Upload Document") && candidate.includes('name="file"'),
      "upload document"
    );
    const blob = new Blob(["%PDF-1.4\n% E2E verification\n"], { type: "application/pdf" });
    await postAction(
      "/admin/documents",
      form,
      { title: `${title} Document`, visibility: "PRIVATE", description: "E2E document" },
      [{ name: "file", blob, filename: `${slug}.pdf` }]
    );
    const created = await prisma.document.findFirst({
      where: { title: `${title} Document` },
      orderBy: { createdAt: "desc" },
    });
    assert(created?.fileUrl?.includes(slug), "Document was not uploaded");
    uploadedPath = join(process.cwd(), "uploads", created.fileUrl.replace(/^\/+/, ""));
    cleanup.push(async () => {
      if (uploadedPath) await unlink(uploadedPath).catch(() => {});
    });

    current = await page("/admin/documents");
    form = findForm(
      current.body,
      (candidate) => candidate.includes(created.id) && candidate.includes("Delete"),
      "delete document"
    );
    await postAction("/admin/documents", form, { id: created.id });
    assert(!(await prisma.document.findUnique({ where: { id: created.id } })), "Document was not deleted");
  });

  await run("Statistics add/delete actions reflect publicly", async () => {
    let current = await page("/admin/statistics");
    let form = findForm(
      current.body,
      (candidate) => candidate.includes("Add Metric") && candidate.includes('name="label"'),
      "add statistic"
    );
    await postAction("/admin/statistics", form, {
      label: `${title} Metric`,
      value: "42",
      suffix: "+",
      sortOrder: 9999,
      isVisible: "on",
    });
    const created = await prisma.statistic.findFirst({
      where: { label: `${title} Metric` },
      orderBy: { createdAt: "desc" },
    });
    assert(created?.isVisible, "Statistic was not created as visible");
    await publicHomeIncludes(`${title} Metric`, "42+");

    current = await page("/admin/statistics");
    form = findForm(
      current.body,
      (candidate) => candidate.includes(created.id) && candidate.includes("Delete"),
      "delete statistic"
    );
    await postAction("/admin/statistics", form, { id: created.id });
    assert(!(await prisma.statistic.findUnique({ where: { id: created.id } })), "Statistic was not deleted");
  });

  await run("Public enquiry plus admin status/delete actions", async () => {
    const publicPage = await page("/", false);
    let form = findForm(
      publicPage.body,
      (candidate) => candidate.includes("Send Enquiry") && candidate.includes('name="email"'),
      "public enquiry"
    );
    await postAction(
      "/",
      form,
      {
        name: `${title} Lead`,
        company: `${title} Co`,
        phone: "0000000000",
        email: `${slug}@lead.example.com`,
        material: "Copper",
        quantity: "1 ton",
        country: "Australia",
        message: "E2E enquiry",
      },
      [],
      false
    );
    const created = await prisma.inquiry.findFirst({
      where: { email: `${slug}@lead.example.com` },
      orderBy: { createdAt: "desc" },
    });
    assert(created?.status === "NEW", "Public enquiry was not created");

    let current = await page("/admin/inquiries");
    form = findForm(
      current.body,
      (candidate) => candidate.includes(created.id) && candidate.includes('name="status"'),
      "update inquiry"
    );
    await postAction("/admin/inquiries", form, { id: created.id, status: "CONTACTED" });
    const updated = await prisma.inquiry.findUnique({ where: { id: created.id } });
    assert(updated?.status === "CONTACTED", "Inquiry status was not updated");

    current = await page("/admin/inquiries");
    form = findForm(
      current.body,
      (candidate) =>
        candidate.includes(created.id) &&
        candidate.includes("Delete") &&
        !candidate.includes('name="status"'),
      "delete inquiry"
    );
    await postAction("/admin/inquiries", form, { id: created.id });
    assert(!(await prisma.inquiry.findUnique({ where: { id: created.id } })), "Inquiry was not deleted");
  });
} finally {
  for (const fn of cleanup.reverse()) {
    try {
      await fn();
    } catch {}
  }

  await prisma.service.deleteMany({ where: { slug: `${slug}-service` } }).catch(() => {});
  await prisma.material.deleteMany({ where: { slug: `${slug}-material` } }).catch(() => {});
  await prisma.project.deleteMany({ where: { slug: `${slug}-project` } }).catch(() => {});
  await prisma.testimonial.deleteMany({ where: { customerName: `${title} Customer` } }).catch(() => {});
  await prisma.document.deleteMany({ where: { title: `${title} Document` } }).catch(() => {});
  await prisma.statistic.deleteMany({ where: { label: `${title} Metric` } }).catch(() => {});
  await prisma.inquiry.deleteMany({ where: { email: { contains: slug } } }).catch(() => {});
  await prisma.$disconnect();
  await pool.end();
}

console.table(results);

if (results.some((result) => !result.ok)) {
  process.exit(1);
}
