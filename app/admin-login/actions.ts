"use server";

import { redirect } from "next/navigation";
import { createAdminSession, isValidAdminLogin } from "@/lib/auth";

export async function loginAction(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!isValidAdminLogin(email, password)) {
    redirect("/admin-login?error=1");
  }

  await createAdminSession();
  redirect("/admin");
}
