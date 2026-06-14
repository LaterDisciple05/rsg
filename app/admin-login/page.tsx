import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { LockKeyhole } from "lucide-react";
import { getAdminCredentials, getAdminSession } from "@/lib/auth";
import { loginAction } from "./actions";

type LoginPageProps = {
  searchParams: Promise<{
    error?: string;
  }>;
};

export default async function AdminLoginPage({ searchParams }: LoginPageProps) {
  const session = await getAdminSession();
  const params = await searchParams;
  const credentials = getAdminCredentials();

  if (session) {
    redirect("/admin");
  }

  return (
    <main className="min-h-screen bg-rsg-paper px-5 py-10">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-md flex-col justify-center">
        <div className="rounded-lg border border-rsg-line bg-white p-7 shadow-sm">
          <Link
            href="/"
            className="relative mx-auto block h-20 w-72"
            aria-label="Rising Sun Global home"
          >
            <Image
              src="/rsg_logo2.png"
              alt="Rising Sun Global"
              fill
              className="object-contain"
              priority
            />
          </Link>

          <div className="mt-8 flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-rsg-orange-soft text-rsg-orange-dark">
              <LockKeyhole size={22} />
            </div>
            <div>
              <h1 className="text-2xl font-black text-rsg-ink">
                Admin login
              </h1>
              <p className="mt-2 text-sm leading-6 text-rsg-muted">
                Private CMS access for Rising Sun Global content management.
              </p>
            </div>
          </div>

          {params.error ? (
            <div className="mt-6 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
              Invalid email or password.
            </div>
          ) : null}

          <form action={loginAction} className="mt-7 grid gap-4">
            <label className="grid gap-2">
              <span className="text-sm font-bold text-rsg-charcoal">Email</span>
              <input
                name="email"
                type="email"
                defaultValue={credentials.email}
                className="rounded-md border border-rsg-line px-4 py-3 text-rsg-ink outline-none focus:border-rsg-orange"
                required
              />
            </label>
            <label className="grid gap-2">
              <span className="text-sm font-bold text-rsg-charcoal">
                Password
              </span>
              <input
                name="password"
                type="password"
                defaultValue={credentials.password}
                className="rounded-md border border-rsg-line px-4 py-3 text-rsg-ink outline-none focus:border-rsg-orange"
                required
              />
            </label>
            <button
              type="submit"
              className="mt-2 rounded-md bg-rsg-navy px-5 py-3.5 text-sm font-black text-white transition-colors hover:bg-rsg-orange-dark"
            >
              Enter CMS
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
