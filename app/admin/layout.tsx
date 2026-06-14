import Image from "next/image";
import Link from "next/link";
import { BarChart3, Building2, FileText, FolderKanban, Inbox, Layers3, LogOut, MessageSquareQuote, Package, Settings2 } from "lucide-react";
import { requireAdmin } from "@/lib/auth";
import { logoutAction } from "./actions";

export const dynamic = "force-dynamic";

const navItems = [
  { name: "Dashboard", href: "/admin", icon: BarChart3 },
  { name: "Company", href: "/admin/company", icon: Building2 },
  { name: "Services", href: "/admin/services", icon: Settings2 },
  { name: "Materials", href: "/admin/materials", icon: Package },
  { name: "Projects", href: "/admin/projects", icon: FolderKanban },
  { name: "Testimonials", href: "/admin/testimonials", icon: MessageSquareQuote },
  { name: "Documents", href: "/admin/documents", icon: FileText },
  { name: "Statistics", href: "/admin/statistics", icon: Layers3 },
  { name: "Inquiries", href: "/admin/inquiries", icon: Inbox },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireAdmin();

  return (
    <div className="min-h-screen bg-rsg-paper text-rsg-ink">
      <aside className="fixed inset-y-0 left-0 hidden w-72 border-r border-rsg-line bg-white lg:block">
        <div className="border-b border-rsg-line px-6 py-4">
          <Link href="/admin" className="relative block h-20 w-64">
            <Image
              src="/rsg_logo2.png"
              alt="Rising Sun Global"
              fill
              className="object-contain object-left scale-125 origin-left"
              priority
            />
          </Link>
          <p className="mt-3 text-xs font-semibold text-rsg-muted">
            Logged in as {session.email}
          </p>
        </div>

        <nav className="grid gap-1 p-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 rounded-md px-3 py-3 text-sm font-bold text-rsg-charcoal hover:bg-rsg-orange-soft hover:text-rsg-orange-dark"
              >
                <Icon size={18} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </aside>

      <div className="lg:pl-72">
        <header className="sticky top-0 z-40 border-b border-rsg-line bg-white/95 px-5 py-4 backdrop-blur-md lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.14em] text-rsg-orange-dark">
                RSG CMS
              </p>
              <p className="mt-1 text-sm font-semibold text-rsg-muted">
                Private admin panel
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="/"
                className="rounded-md border border-rsg-line px-4 py-2 text-sm font-bold text-rsg-charcoal hover:bg-rsg-paper"
              >
                View site
              </Link>
              <form action={logoutAction}>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-md bg-rsg-navy px-4 py-2 text-sm font-bold text-white hover:bg-rsg-orange-dark"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </form>
            </div>
          </div>

          <nav className="mt-4 flex gap-2 overflow-x-auto pb-1 lg:hidden">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="shrink-0 rounded-md border border-rsg-line px-3 py-2 text-sm font-bold text-rsg-charcoal"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </header>

        <main className="px-5 py-8 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
