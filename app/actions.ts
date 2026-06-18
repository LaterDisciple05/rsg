"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { sendInquiryNotification } from "@/lib/inquiry-email";

function text(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

export async function submitInquiryAction(formData: FormData) {
  const inquiry = await prisma.inquiry.create({
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

  let mailStatus: "sent" | "failed" | "not-configured" = "sent";

  try {
    mailStatus = await sendInquiryNotification(inquiry);
  } catch (error) {
    mailStatus = "failed";
    console.error("Inquiry saved, but email notification failed.", error);
  }

  redirect(`/?inquiry=sent&mail=${mailStatus}#contact`);
}
