"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

/** 
 * Force Refresh: 2026-06-14T17:48:00 
 * Picking up the new Prisma schema.
 */
import { writeFile, mkdir } from "node:fs/promises";
import { join } from "node:path";
import { existsSync } from "node:fs";
import type { InquiryStatus, ProjectStatus, Visibility } from "@/app/generated/prisma";
import { destroyAdminSession, requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  isValidEmail,
  saveInquiryEmailSettings,
} from "@/lib/inquiry-email-settings";
import {
  isSectionVisibilityKey,
  saveSectionVisibility,
} from "@/lib/section-visibility";

function text(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function numberValue(formData: FormData, key: string) {
  const value = Number(text(formData, key));
  return Number.isFinite(value) ? value : 0;
}

function visibility(formData: FormData): Visibility {
  return text(formData, "visibility") === "PRIVATE" ? "PRIVATE" : "PUBLIC";
}

function projectStatus(formData: FormData): ProjectStatus {
  switch (text(formData, "status")) {
    case "ACTIVE":
      return "ACTIVE";
    case "COMPLETED":
      return "COMPLETED";
    case "ARCHIVED":
      return "ARCHIVED";
    default:
      return "PLANNED";
  }
}

function inquiryStatus(formData: FormData): InquiryStatus {
  switch (text(formData, "status")) {
    case "CONTACTED":
      return "CONTACTED";
    case "QUOTED":
      return "QUOTED";
    case "WON":
      return "WON";
    case "LOST":
      return "LOST";
    case "ARCHIVED":
      return "ARCHIVED";
    default:
      return "NEW";
  }
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

async function uploadFile(file: File | null, folder: string) {
  if (!file || file.size === 0) return null;

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploadDir = join(process.cwd(), "uploads", folder);
  if (!existsSync(uploadDir)) {
    await mkdir(uploadDir, { recursive: true });
  }

  const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
  const filePath = join(uploadDir, filename);
  await writeFile(filePath, buffer);

  return `/${folder}/${filename}`;
}

function formFiles(formData: FormData, ...keys: string[]) {
  return keys
    .flatMap((key) => formData.getAll(key))
    .filter((entry): entry is File => entry instanceof File && entry.size > 0);
}

function readableFileTitle(file: File) {
  return file.name
    .replace(/\.[^.]+$/, "")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function revalidateAdmin() {
  revalidatePath("/admin", "layout");
  revalidatePath("/");
}

function documentRedirect(formData: FormData, fallback = "/admin/documents") {
  const value = text(formData, "redirectTo");
  return value.startsWith("/admin/documents") ? value : fallback;
}

function withQuery(path: string, key: string, value: string) {
  const [pathname, query = ""] = path.split("?");
  const search = new URLSearchParams(query);
  search.set(key, value);

  return `${pathname}?${search.toString()}`;
}

export async function logoutAction() {
  await destroyAdminSession();
  redirect("/admin-login");
}

export async function saveCompanyAction(formData: FormData) {
  await requireAdmin();

  await prisma.companyProfile.upsert({
    where: { id: "main" },
    create: {
      id: "main",
      name: text(formData, "name") || "Rising Sun Global",
      about: text(formData, "about"),
      mission: text(formData, "mission"),
      vision: text(formData, "vision"),
      email: text(formData, "email"),
      phone: text(formData, "phone"),
      whatsapp: text(formData, "whatsapp"),
      linkedinUrl: text(formData, "linkedinUrl"),
      address: text(formData, "address"),
      city: text(formData, "city"),
      country: text(formData, "country"),
    },
    update: {
      name: text(formData, "name") || "Rising Sun Global",
      about: text(formData, "about"),
      mission: text(formData, "mission"),
      vision: text(formData, "vision"),
      email: text(formData, "email"),
      phone: text(formData, "phone"),
      whatsapp: text(formData, "whatsapp"),
      linkedinUrl: text(formData, "linkedinUrl"),
      address: text(formData, "address"),
      city: text(formData, "city"),
      country: text(formData, "country"),
    },
  });

  revalidateAdmin();
  redirect("/admin/company?saved=1");
}

export async function saveServiceAction(formData: FormData) {
  await requireAdmin();

  const id = text(formData, "id");
  const title = text(formData, "title");
  const slug = text(formData, "slug") || slugify(title);

  if (!title || !slug) {
    redirect("/admin/services?error=missing");
  }

  const data = {
    title,
    slug,
    description: text(formData, "description"),
    icon: text(formData, "icon"),
    sortOrder: numberValue(formData, "sortOrder"),
    visibility: visibility(formData),
  };

  if (id) {
    await prisma.service.update({ where: { id }, data });
  } else {
    await prisma.service.create({ data });
  }

  revalidateAdmin();
  redirect("/admin/services?saved=1");
}

export async function deleteServiceAction(formData: FormData) {
  await requireAdmin();
  await prisma.service.delete({ where: { id: text(formData, "id") } });
  revalidateAdmin();
  redirect("/admin/services?deleted=1");
}

export async function saveMaterialAction(formData: FormData) {
  await requireAdmin();

  const id = text(formData, "id");
  const title = text(formData, "title");
  const slug = text(formData, "slug") || slugify(title);

  if (!title || !slug) {
    redirect("/admin/materials?error=missing");
  }

  const data = {
    title,
    slug,
    sortOrder: numberValue(formData, "sortOrder"),
    visibility: visibility(formData),
  };

  if (id) {
    await prisma.material.update({ where: { id }, data });
  } else {
    await prisma.material.create({ data });
  }

  revalidateAdmin();
  redirect("/admin/materials?saved=1");
}

export async function deleteMaterialAction(formData: FormData) {
  await requireAdmin();
  await prisma.material.delete({ where: { id: text(formData, "id") } });
  revalidateAdmin();
  redirect("/admin/materials?deleted=1");
}

export async function saveProjectAction(formData: FormData) {
  await requireAdmin();

  const id = text(formData, "id");
  const title = text(formData, "title");
  const slug = text(formData, "slug") || slugify(title);

  if (!title || !slug) {
    redirect("/admin/projects?error=missing");
  }

  const file = formData.get("image") as File;
  const imageUrl = await uploadFile(file, "projects");

  const data = {
    title,
    slug,
    description: text(formData, "description"),
    category: text(formData, "category"),
    country: text(formData, "country") || null,
    industry: text(formData, "industry") || null,
    featured: formData.get("featured") === "on",
    visibility: visibility(formData),
    status: projectStatus(formData),
  };

  let project;
  if (id) {
    project = await prisma.project.update({ where: { id }, data });
  } else {
    project = await prisma.project.create({ data });
  }

  if (imageUrl) {
    await prisma.projectImage.create({
      data: {
        projectId: project.id,
        url: imageUrl,
        alt: title,
      },
    });
  }

  revalidateAdmin();
  redirect("/admin/projects?saved=1");
}

export async function deleteProjectAction(formData: FormData) {
  await requireAdmin();
  await prisma.project.delete({ where: { id: text(formData, "id") } });
  revalidateAdmin();
  redirect("/admin/projects?deleted=1");
}

export async function saveSectionVisibilityAction(formData: FormData) {
  await requireAdmin();

  const section = text(formData, "section");
  const redirectTo = text(formData, "redirectTo");
  const safeRedirectTo = redirectTo.startsWith("/admin/") ? redirectTo : "/admin";

  if (!isSectionVisibilityKey(section)) {
    redirect(withQuery(safeRedirectTo, "error", "invalid"));
  }

  await saveSectionVisibility(section, text(formData, "isVisible") === "on");
  revalidateAdmin();
  redirect(withQuery(safeRedirectTo, "saved", "1"));
}

export async function saveTestimonialAction(formData: FormData) {
  await requireAdmin();

  const id = text(formData, "id");
  const data = {
    customerName: text(formData, "customerName"),
    companyName: text(formData, "companyName"),
    message: text(formData, "message"),
    visibility: visibility(formData),
  };

  if (id) {
    await prisma.testimonial.update({ where: { id }, data });
  } else {
    await prisma.testimonial.create({ data });
  }

  revalidateAdmin();
  redirect("/admin/testimonials?saved=1");
}

export async function deleteTestimonialAction(formData: FormData) {
  await requireAdmin();
  await prisma.testimonial.delete({ where: { id: text(formData, "id") } });
  revalidateAdmin();
  redirect("/admin/testimonials?deleted=1");
}

export async function saveDocumentAction(formData: FormData) {
  await requireAdmin();

  const id = text(formData, "id");
  const title = text(formData, "title");
  const projectId = text(formData, "projectId");
  const holderId = text(formData, "holderId");
  const files = formFiles(formData, "files", "file");
  let fileUrl = text(formData, "existingFileUrl");
  const redirectTo = documentRedirect(formData);
  const relationData = projectId
    ? { projectId, holderId: null }
    : { projectId: null, holderId: holderId || null };

  if (id) {
    if (files[0]) {
      fileUrl = (await uploadFile(files[0], "documents")) || fileUrl;
    }

    if (!title || !fileUrl) {
      redirect(withQuery(redirectTo, "error", "missing"));
    }

    const data = {
      ...relationData,
      title,
      fileUrl,
      description: text(formData, "description"),
      visibility: visibility(formData),
    };

    await prisma.document.update({ where: { id }, data });
  } else {
    if (!files.length) {
      redirect(withQuery(redirectTo, "error", "missing"));
    }

    await Promise.all(
      files.map(async (file, index) => {
        const uploadedUrl = await uploadFile(file, "documents");
        const fallbackTitle = readableFileTitle(file) || `Document ${index + 1}`;

        if (!uploadedUrl) {
          return null;
        }

        return prisma.document.create({
          data: {
            ...relationData,
            title:
              files.length === 1
                ? title || fallbackTitle
                : title
                  ? `${title} - ${fallbackTitle}`
                  : fallbackTitle,
            fileUrl: uploadedUrl,
            description: text(formData, "description"),
            visibility: visibility(formData),
          },
        });
      })
    );
  }

  const successRedirect = projectId
    ? `/admin/documents?scope=projects&mode=detail&id=${projectId}`
    : holderId
      ? `/admin/documents?scope=company&mode=detail&id=${holderId}`
      : redirectTo;

  revalidateAdmin();
  redirect(withQuery(successRedirect, "saved", "1"));
}

export async function deleteDocumentAction(formData: FormData) {
  await requireAdmin();
  const redirectTo = documentRedirect(formData);
  await prisma.document.delete({ where: { id: text(formData, "id") } });
  revalidateAdmin();
  redirect(withQuery(redirectTo, "deleted", "1"));
}

export async function saveCompanyDocumentHolderAction(formData: FormData) {
  await requireAdmin();

  const id = text(formData, "id");
  const title = text(formData, "title");
  const redirectTo = documentRedirect(
    formData,
    "/admin/documents?scope=company&mode=review"
  );

  if (!title) {
    redirect(withQuery(redirectTo, "error", "missing"));
  }

  const data = {
    title,
    description: text(formData, "description"),
    visibility: visibility(formData),
  };

  const holder = id
    ? await prisma.companyDocumentHolder.update({ where: { id }, data })
    : await prisma.companyDocumentHolder.create({ data });

  const files = formFiles(formData, "files", "file");

  if (files.length) {
    await Promise.all(
      files.map(async (file, index) => {
        const uploadedUrl = await uploadFile(file, "documents");
        const fallbackTitle = readableFileTitle(file) || `Document ${index + 1}`;

        if (!uploadedUrl) {
          return null;
        }

        return prisma.document.create({
          data: {
            holderId: holder.id,
            projectId: null,
            title:
              files.length === 1
                ? fallbackTitle
                : `${fallbackTitle}`,
            fileUrl: uploadedUrl,
            description: text(formData, "documentDescription"),
            visibility: visibility(formData),
          },
        });
      })
    );
  }

  revalidateAdmin();
  redirect(
    withQuery(
      `/admin/documents?scope=company&mode=detail&id=${holder.id}`,
      "saved",
      "1"
    )
  );
}

export async function deleteCompanyDocumentHolderAction(formData: FormData) {
  await requireAdmin();

  await prisma.companyDocumentHolder.delete({
    where: { id: text(formData, "id") },
  });

  revalidateAdmin();
  redirect("/admin/documents?scope=company&mode=review&deleted=1");
}

export async function saveStatisticAction(formData: FormData) {
  await requireAdmin();

  const id = text(formData, "id");
  const label = text(formData, "label");

  if (!label) {
    redirect("/admin/statistics?error=missing");
  }

  const data = {
    label,
    value: text(formData, "value"),
    suffix: text(formData, "suffix"),
    isVisible: formData.get("isVisible") === "on",
    sortOrder: numberValue(formData, "sortOrder"),
  };

  if (id) {
    await prisma.statistic.update({ where: { id }, data });
  } else {
    await prisma.statistic.create({ data });
  }

  revalidateAdmin();
  redirect("/admin/statistics?saved=1");
}

export async function deleteStatisticAction(formData: FormData) {
  await requireAdmin();
  await prisma.statistic.delete({ where: { id: text(formData, "id") } });
  revalidateAdmin();
  redirect("/admin/statistics?deleted=1");
}

export async function updateInquiryStatusAction(formData: FormData) {
  await requireAdmin();

  await prisma.inquiry.update({
    where: { id: text(formData, "id") },
    data: {
      status: inquiryStatus(formData),
    },
  });

  revalidateAdmin();
  redirect("/admin/inquiries?saved=1");
}

export async function saveInquiryEmailSettingsAction(formData: FormData) {
  await requireAdmin();

  const receiverEmail = text(formData, "receiverEmail");

  if (!isValidEmail(receiverEmail)) {
    redirect("/admin/inquiries?emailError=1");
  }

  await saveInquiryEmailSettings({ receiverEmail });
  revalidateAdmin();
  redirect("/admin/inquiries?emailSettings=1");
}

export async function deleteInquiryAction(formData: FormData) {
  await requireAdmin();
  await prisma.inquiry.delete({ where: { id: text(formData, "id") } });
  revalidateAdmin();
  redirect("/admin/inquiries?deleted=1");
}

export async function seedDefaultsAction() {
  await requireAdmin();

  // Create main company profile
  await prisma.companyProfile.upsert({
    where: { id: "main" },
    create: {
      id: "main",
      name: "Rising Sun Global",
      email: "risingsunglobal.au@gmail.com",
      phone: "+61 432 753 733",
      whatsapp: "+61 432 753 733",
      linkedinUrl: "https://www.linkedin.com/in/rahul-shah-707847147/",
      city: "Adelaide",
      country: "Australia",
    },
    update: {},
  });

  const services = [
    { title: "Scrap Metal Purchasing", slug: "scrap-metal-purchasing", description: "Buying ferrous and non-ferrous scrap from industrial sellers.", icon: "scrap-metal", sortOrder: 1 },
    { title: "Demolition Metal Recovery", slug: "demolition-metal-recovery", description: "Recovery support for demolition and surplus metal streams.", icon: "demolition", sortOrder: 2 },
    { title: "Industrial Recycling", slug: "industrial-recycling", description: "Recycling pathways for commercial metal operations.", icon: "industrial-recycling", sortOrder: 3 },
    { title: "Bulk Supply & Export", slug: "bulk-supply-export", description: "Export-focused coordination for recovered metal supply.", icon: "bulk-export", sortOrder: 4 },
  ];

  for (const s of services) {
    await prisma.service.upsert({
      where: { slug: s.slug },
      create: s,
      update: {},
    });
  }

  const materials = [
    "Copper", "Brass", "Aluminium", "Steel", "Stainless Steel", "Insulated Cables",
    "Motors", "Batteries", "Alloy Rims", "Industrial Mixed Scrap", "Demolition Metal", "Bulk Export Lots",
  ];

  for (let i = 0; i < materials.length; i++) {
    const title = materials[i];
    const slug = slugify(title);
    await prisma.material.upsert({
      where: { slug },
      create: { title, slug, sortOrder: i + 1 },
      update: {},
    });
  }

  revalidateAdmin();
  redirect("/admin?seeded=1");
}
