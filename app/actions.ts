"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

function text(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

export async function submitInquiryAction(formData: FormData) {
  await prisma.inquiry.create({
    data: {
      name: text(formData, "name"),
      company: text(formData, "company"),
      email: text(formData, "email"),
      phone: text(formData, "phone"),
      country: text(formData, "country"),
      material: text(formData, "material"),
      quantity: text(formData, "quantity"),
      message: text(formData, "message"),
      status: "NEW",
    },
  });

  redirect("/?inquiry=sent#contact");
}
