import Link from "next/link";
import { Database, PlusCircle } from "lucide-react";
import { seedDefaultsAction } from "./actions";
import { DismissibleAdminNotice, SectionVisibilityCard } from "./_components";
import { prisma } from "@/lib/prisma";
import { getSectionVisibility } from "@/lib/section-visibility";

type DashboardProps = {
  searchParams: Promise<{
    seeded?: string;
    saved?: string;
  }>;
};

export default async function AdminDashboard({ searchParams }: DashboardProps) {
  const params = await searchParams;

  const [
    serviceCount,
    materialCount,
    projectCount,
    testimonialCount,
    documentCount,
    statisticCount,
    inquiryCount,
    sectionVisibility,
  ] = await Promise.all([
    prisma.service.count(),
    prisma.material.count(),
    prisma.project.count(),
    prisma.testimonial.count(),
    prisma.document.count(),
    prisma.statistic.count(),
    prisma.inquiry.count(),
    getSectionVisibility(),
  ]);

  const cards = [
    { label: "Services", count: serviceCount, href: "/admin/services" },
    { label: "Materials", count: materialCount, href: "/admin/materials" },
    { label: "Projects", count: projectCount, href: "/admin/projects" },
    { label: "Testimonials", count: testimonialCount, href: "/admin/testimonials" },
    { label: "Documents", count: documentCount, href: "/admin/documents" },
    { label: "Statistics", count: statisticCount, href: "/admin/statistics" },
    { label: "Inquiries", count: inquiryCount, href: "/admin/inquiries" },
  ];

  return (
    <div className="grid gap-8">
      <div className="rounded-lg border border-rsg-line bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="rsg-section-kicker">Dashboard</p>
            <h1 className="mt-3 text-3xl font-black text-rsg-ink">
              Rising Sun Global CMS
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-rsg-muted">
              Manage company information, services, materials, projects,
              testimonials, documents, statistics, and customer inquiries.
            </p>
          </div>

          <form action={seedDefaultsAction}>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-rsg-orange px-5 py-3 text-sm font-black text-white hover:bg-rsg-orange-dark"
            >
              <PlusCircle size={18} />
              Seed Useful Defaults
            </button>
          </form>
        </div>

        {params.seeded ? (
          <DismissibleAdminNotice
            removeParams={["seeded"]}
            className="mt-5 rounded-md border border-green-200 bg-green-50 px-4 py-3 text-sm font-bold text-green-800"
          >
            Default company services and materials are ready.
          </DismissibleAdminNotice>
        ) : null}
        {params.saved ? (
          <DismissibleAdminNotice
            removeParams={["saved"]}
            className="mt-5 rounded-md border border-rsg-orange/25 bg-rsg-orange-soft px-4 py-3 text-sm font-bold text-rsg-orange-dark"
          >
            Section visibility has been updated.
          </DismissibleAdminNotice>
        ) : null}
      </div>

      <SectionVisibilityCard
        section="whyRsg"
        title="Why RSG section"
        body="Control whether the full Why RSG section appears on the main website and in the website navigation."
        isVisible={sectionVisibility.whyRsg}
        redirectTo="/admin"
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="rounded-lg border border-rsg-line bg-white p-5 shadow-sm hover:border-rsg-orange"
          >
            <Database className="text-rsg-orange-dark" size={24} />
            <p className="mt-5 text-sm font-bold uppercase tracking-[0.12em] text-rsg-muted">
              {card.label}
            </p>
            <p className="mt-2 text-4xl font-black text-rsg-ink">
              {card.count}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
