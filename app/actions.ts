"use server";

import { redirect } from "next/navigation";
import { createId, executeSql, sqlValue } from "@/lib/cms-db";

function text(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

export async function submitInquiryAction(formData: FormData) {
  executeSql(`
    INSERT INTO "Inquiry" (
      "id", "name", "company", "email", "phone", "country",
      "material", "quantity", "message", "status"
    )
    VALUES (
      ${sqlValue(createId())},
      ${sqlValue(text(formData, "name"))},
      ${sqlValue(text(formData, "company"))},
      ${sqlValue(text(formData, "email"))},
      ${sqlValue(text(formData, "phone"))},
      ${sqlValue(text(formData, "country"))},
      ${sqlValue(text(formData, "material"))},
      ${sqlValue(text(formData, "quantity"))},
      ${sqlValue(text(formData, "message"))},
      'NEW'
    );
  `);

  redirect("/?inquiry=sent#contact");
}
