"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { destroyAdminSession, requireAdmin } from "@/lib/auth";
import { createId, executeSql, sqlValue } from "@/lib/cms-db";

function text(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function numberValue(formData: FormData, key: string) {
  const value = Number(text(formData, key));
  return Number.isFinite(value) ? value : 0;
}

function visibility(formData: FormData) {
  return text(formData, "visibility") === "PRIVATE" ? "PRIVATE" : "PUBLIC";
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

function revalidateAdmin() {
  revalidatePath("/admin", "layout");
}

export async function logoutAction() {
  await destroyAdminSession();
  redirect("/admin-login");
}

export async function saveCompanyAction(formData: FormData) {
  await requireAdmin();

  executeSql(`
    INSERT INTO "CompanyProfile" (
      "id", "name", "about", "mission", "vision", "email", "phone",
      "whatsapp", "linkedinUrl", "address", "city", "country", "updatedAt"
    )
    VALUES (
      'main',
      ${sqlValue(text(formData, "name") || "Rising Sun Global")},
      ${sqlValue(text(formData, "about"))},
      ${sqlValue(text(formData, "mission"))},
      ${sqlValue(text(formData, "vision"))},
      ${sqlValue(text(formData, "email"))},
      ${sqlValue(text(formData, "phone"))},
      ${sqlValue(text(formData, "whatsapp"))},
      ${sqlValue(text(formData, "linkedinUrl"))},
      ${sqlValue(text(formData, "address"))},
      ${sqlValue(text(formData, "city"))},
      ${sqlValue(text(formData, "country"))},
      NOW()
    )
    ON CONFLICT ("id") DO UPDATE SET
      "name" = EXCLUDED."name",
      "about" = EXCLUDED."about",
      "mission" = EXCLUDED."mission",
      "vision" = EXCLUDED."vision",
      "email" = EXCLUDED."email",
      "phone" = EXCLUDED."phone",
      "whatsapp" = EXCLUDED."whatsapp",
      "linkedinUrl" = EXCLUDED."linkedinUrl",
      "address" = EXCLUDED."address",
      "city" = EXCLUDED."city",
      "country" = EXCLUDED."country",
      "updatedAt" = NOW();
  `);

  revalidateAdmin();
  redirect("/admin/company?saved=1");
}

export async function saveServiceAction(formData: FormData) {
  await requireAdmin();

  const id = text(formData, "id") || createId();
  const title = text(formData, "title");
  const slug = text(formData, "slug") || slugify(title);

  if (!title || !slug) {
    redirect("/admin/services?error=missing");
  }

  executeSql(`
    INSERT INTO "Service" (
      "id", "title", "slug", "description", "icon", "sortOrder",
      "visibility", "updatedAt"
    )
    VALUES (
      ${sqlValue(id)},
      ${sqlValue(title)},
      ${sqlValue(slug)},
      ${sqlValue(text(formData, "description"))},
      ${sqlValue(text(formData, "icon"))},
      ${sqlValue(numberValue(formData, "sortOrder"))},
      ${sqlValue(visibility(formData))},
      NOW()
    )
    ON CONFLICT ("id") DO UPDATE SET
      "title" = EXCLUDED."title",
      "slug" = EXCLUDED."slug",
      "description" = EXCLUDED."description",
      "icon" = EXCLUDED."icon",
      "sortOrder" = EXCLUDED."sortOrder",
      "visibility" = EXCLUDED."visibility",
      "updatedAt" = NOW();
  `);

  revalidateAdmin();
  redirect("/admin/services?saved=1");
}

export async function deleteServiceAction(formData: FormData) {
  await requireAdmin();
  executeSql(`DELETE FROM "Service" WHERE "id" = ${sqlValue(text(formData, "id"))};`);
  revalidateAdmin();
  redirect("/admin/services?deleted=1");
}

export async function saveMaterialAction(formData: FormData) {
  await requireAdmin();

  const id = text(formData, "id") || createId();
  const title = text(formData, "title");
  const slug = text(formData, "slug") || slugify(title);

  if (!title || !slug) {
    redirect("/admin/materials?error=missing");
  }

  executeSql(`
    INSERT INTO "Material" ("id", "title", "slug", "sortOrder", "visibility", "updatedAt")
    VALUES (
      ${sqlValue(id)},
      ${sqlValue(title)},
      ${sqlValue(slug)},
      ${sqlValue(numberValue(formData, "sortOrder"))},
      ${sqlValue(visibility(formData))},
      NOW()
    )
    ON CONFLICT ("id") DO UPDATE SET
      "title" = EXCLUDED."title",
      "slug" = EXCLUDED."slug",
      "sortOrder" = EXCLUDED."sortOrder",
      "visibility" = EXCLUDED."visibility",
      "updatedAt" = NOW();
  `);

  revalidateAdmin();
  redirect("/admin/materials?saved=1");
}

export async function deleteMaterialAction(formData: FormData) {
  await requireAdmin();
  executeSql(`DELETE FROM "Material" WHERE "id" = ${sqlValue(text(formData, "id"))};`);
  revalidateAdmin();
  redirect("/admin/materials?deleted=1");
}

export async function saveProjectAction(formData: FormData) {
  await requireAdmin();

  const id = text(formData, "id") || createId();
  const title = text(formData, "title");
  const slug = text(formData, "slug") || slugify(title);

  if (!title || !slug) {
    redirect("/admin/projects?error=missing");
  }

  executeSql(`
    INSERT INTO "Project" (
      "id", "title", "slug", "description", "category", "country",
      "industry", "featured", "visibility", "status", "updatedAt"
    )
    VALUES (
      ${sqlValue(id)},
      ${sqlValue(title)},
      ${sqlValue(slug)},
      ${sqlValue(text(formData, "description"))},
      ${sqlValue(text(formData, "category"))},
      ${sqlValue(text(formData, "country"))},
      ${sqlValue(text(formData, "industry"))},
      ${sqlValue(formData.get("featured") === "on")},
      ${sqlValue(visibility(formData))},
      ${sqlValue(text(formData, "status") || "PLANNED")},
      NOW()
    )
    ON CONFLICT ("id") DO UPDATE SET
      "title" = EXCLUDED."title",
      "slug" = EXCLUDED."slug",
      "description" = EXCLUDED."description",
      "category" = EXCLUDED."category",
      "country" = EXCLUDED."country",
      "industry" = EXCLUDED."industry",
      "featured" = EXCLUDED."featured",
      "visibility" = EXCLUDED."visibility",
      "status" = EXCLUDED."status",
      "updatedAt" = NOW();
  `);

  revalidateAdmin();
  redirect("/admin/projects?saved=1");
}

export async function deleteProjectAction(formData: FormData) {
  await requireAdmin();
  executeSql(`DELETE FROM "Project" WHERE "id" = ${sqlValue(text(formData, "id"))};`);
  revalidateAdmin();
  redirect("/admin/projects?deleted=1");
}

export async function saveTestimonialAction(formData: FormData) {
  await requireAdmin();

  const id = text(formData, "id") || createId();

  executeSql(`
    INSERT INTO "Testimonial" (
      "id", "customerName", "companyName", "message", "visibility", "updatedAt"
    )
    VALUES (
      ${sqlValue(id)},
      ${sqlValue(text(formData, "customerName"))},
      ${sqlValue(text(formData, "companyName"))},
      ${sqlValue(text(formData, "message"))},
      ${sqlValue(visibility(formData))},
      NOW()
    )
    ON CONFLICT ("id") DO UPDATE SET
      "customerName" = EXCLUDED."customerName",
      "companyName" = EXCLUDED."companyName",
      "message" = EXCLUDED."message",
      "visibility" = EXCLUDED."visibility",
      "updatedAt" = NOW();
  `);

  revalidateAdmin();
  redirect("/admin/testimonials?saved=1");
}

export async function deleteTestimonialAction(formData: FormData) {
  await requireAdmin();
  executeSql(`DELETE FROM "Testimonial" WHERE "id" = ${sqlValue(text(formData, "id"))};`);
  revalidateAdmin();
  redirect("/admin/testimonials?deleted=1");
}

export async function saveDocumentAction(formData: FormData) {
  await requireAdmin();

  const id = text(formData, "id") || createId();
  const title = text(formData, "title");
  const fileUrl = text(formData, "fileUrl");

  if (!title || !fileUrl) {
    redirect("/admin/documents?error=missing");
  }

  executeSql(`
    INSERT INTO "Document" (
      "id", "title", "fileUrl", "description", "visibility", "updatedAt"
    )
    VALUES (
      ${sqlValue(id)},
      ${sqlValue(title)},
      ${sqlValue(fileUrl)},
      ${sqlValue(text(formData, "description"))},
      ${sqlValue(visibility(formData))},
      NOW()
    )
    ON CONFLICT ("id") DO UPDATE SET
      "title" = EXCLUDED."title",
      "fileUrl" = EXCLUDED."fileUrl",
      "description" = EXCLUDED."description",
      "visibility" = EXCLUDED."visibility",
      "updatedAt" = NOW();
  `);

  revalidateAdmin();
  redirect("/admin/documents?saved=1");
}

export async function deleteDocumentAction(formData: FormData) {
  await requireAdmin();
  executeSql(`DELETE FROM "Document" WHERE "id" = ${sqlValue(text(formData, "id"))};`);
  revalidateAdmin();
  redirect("/admin/documents?deleted=1");
}

export async function saveStatisticAction(formData: FormData) {
  await requireAdmin();

  const id = text(formData, "id") || createId();
  const label = text(formData, "label");

  if (!label) {
    redirect("/admin/statistics?error=missing");
  }

  executeSql(`
    INSERT INTO "Statistic" (
      "id", "label", "value", "suffix", "isVisible", "sortOrder", "updatedAt"
    )
    VALUES (
      ${sqlValue(id)},
      ${sqlValue(label)},
      ${sqlValue(text(formData, "value"))},
      ${sqlValue(text(formData, "suffix"))},
      ${sqlValue(formData.get("isVisible") === "on")},
      ${sqlValue(numberValue(formData, "sortOrder"))},
      NOW()
    )
    ON CONFLICT ("id") DO UPDATE SET
      "label" = EXCLUDED."label",
      "value" = EXCLUDED."value",
      "suffix" = EXCLUDED."suffix",
      "isVisible" = EXCLUDED."isVisible",
      "sortOrder" = EXCLUDED."sortOrder",
      "updatedAt" = NOW();
  `);

  revalidateAdmin();
  redirect("/admin/statistics?saved=1");
}

export async function deleteStatisticAction(formData: FormData) {
  await requireAdmin();
  executeSql(`DELETE FROM "Statistic" WHERE "id" = ${sqlValue(text(formData, "id"))};`);
  revalidateAdmin();
  redirect("/admin/statistics?deleted=1");
}

export async function updateInquiryStatusAction(formData: FormData) {
  await requireAdmin();

  executeSql(`
    UPDATE "Inquiry"
    SET "status" = ${sqlValue(text(formData, "status") || "NEW")},
        "updatedAt" = NOW()
    WHERE "id" = ${sqlValue(text(formData, "id"))};
  `);

  revalidateAdmin();
  redirect("/admin/inquiries?saved=1");
}

export async function deleteInquiryAction(formData: FormData) {
  await requireAdmin();
  executeSql(`DELETE FROM "Inquiry" WHERE "id" = ${sqlValue(text(formData, "id"))};`);
  revalidateAdmin();
  redirect("/admin/inquiries?deleted=1");
}

export async function seedDefaultsAction() {
  await requireAdmin();

  const services = [
    ["Scrap Metal Purchasing", "scrap-metal-purchasing", "Buying ferrous and non-ferrous scrap from industrial sellers.", 1],
    ["Demolition Metal Recovery", "demolition-metal-recovery", "Recovery support for demolition and surplus metal streams.", 2],
    ["Industrial Recycling", "industrial-recycling", "Recycling pathways for commercial metal operations.", 3],
    ["Bulk Supply & Export", "bulk-supply-export", "Export-focused coordination for recovered metal supply.", 4],
  ];

  const materials = [
    "Copper",
    "Brass",
    "Aluminium",
    "Steel",
    "Stainless Steel",
    "Insulated Cables",
    "Motors",
    "Batteries",
    "Alloy Rims",
    "Industrial Mixed Scrap",
    "Demolition Metal",
    "Bulk Export Lots",
  ];

  executeSql(`
    INSERT INTO "CompanyProfile" (
      "id", "name", "email", "phone", "whatsapp", "linkedinUrl", "city", "country", "updatedAt"
    )
    VALUES (
      'main',
      'Rising Sun Global',
      'risingsunglobal.au@gmail.com',
      '+61 432 753 733',
      '+61 432 753 733',
      'https://www.linkedin.com/in/rahul-shah-707847147/',
      'Adelaide',
      'Australia',
      NOW()
    )
    ON CONFLICT ("id") DO NOTHING;

    ${services
      .map(
        ([title, slug, description, order]) => `
          INSERT INTO "Service" ("id", "title", "slug", "description", "sortOrder", "visibility")
          VALUES (${sqlValue(createId())}, ${sqlValue(title)}, ${sqlValue(slug)}, ${sqlValue(description)}, ${sqlValue(Number(order))}, 'PUBLIC')
          ON CONFLICT ("slug") DO NOTHING;
        `
      )
      .join("\n")}

    ${materials
      .map(
        (material, index) => `
          INSERT INTO "Material" ("id", "title", "slug", "sortOrder", "visibility")
          VALUES (${sqlValue(createId())}, ${sqlValue(material)}, ${sqlValue(slugify(material))}, ${sqlValue(index + 1)}, 'PUBLIC')
          ON CONFLICT ("slug") DO NOTHING;
        `
      )
      .join("\n")}
  `);

  revalidateAdmin();
  redirect("/admin?seeded=1");
}
