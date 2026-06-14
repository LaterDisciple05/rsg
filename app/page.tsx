import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import About from "@/components/sections/about";
import ContactCta from "@/components/sections/contact-cta";
import Hero from "@/components/sections/hero";
import Materials from "@/components/sections/materials";
import Projects from "@/components/sections/projects";
import Services from "@/components/sections/services";
import Testimonials from "@/components/sections/testimonials";
import TrustStrip from "@/components/sections/trust-strip";
import WhyChoose from "@/components/sections/why-choose";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

/** 
 * Force Refresh: 2026-06-14T17:45:00 
 * This comment is here to force Next.js to re-compile this file 
 * and pick up the new Prisma Client schema.
 */
export default async function HomePage() {
  const [
    company,
    services,
    materials,
    projects,
    testimonials,
    statistics,
  ] = await Promise.all([
    prisma.companyProfile.findUnique({ where: { id: "main" } }),
    prisma.service.findMany({
      where: { visibility: "PUBLIC" },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    }),
    prisma.material.findMany({
      where: { visibility: "PUBLIC" },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    }),
    prisma.project.findMany({
      where: { visibility: "PUBLIC" },
      include: {
        images: { orderBy: { sortOrder: "asc" } },
      },
      orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
      take: 6,
    }),
    prisma.testimonial.findMany({
      where: { visibility: "PUBLIC" },
      orderBy: { createdAt: "desc" },
      take: 6,
    }),
    prisma.statistic.findMany({
      where: { isVisible: true },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
      take: 3,
    }),
  ]);

  const businessJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company?.name ?? "Rising Sun Global",
    url: "https://risingsunglobal.com",
    logo: "https://risingsunglobal.com/rsg_logo2.png",
    email: company?.email ?? "risingsunglobal.au@gmail.com",
    telephone: company?.phone ?? "+61432753733",
    address: {
      "@type": "PostalAddress",
      streetAddress: company?.address ?? undefined,
      addressLocality: company?.city ?? "Adelaide",
      addressCountry: company?.country ?? "AU",
    },
    areaServed: ["Australia", "India"],
    sameAs: company?.linkedinUrl
      ? [company.linkedinUrl]
      : ["https://www.linkedin.com/in/rahul-shah-707847147/"],
    knowsAbout: services.length
      ? services.map((service) => service.title)
      : [
          "Scrap metal purchasing",
          "Industrial demolition",
          "Metal recovery",
          "Industrial recycling",
          "Scrap metal export",
        ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(businessJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Navbar />
      <main>
        <Hero />
        <TrustStrip statistics={statistics} />
        <About company={company} />
        <Services services={services} />
        <Materials materials={materials} />
        <Projects projects={projects} />
        <Testimonials testimonials={testimonials} />
        <WhyChoose />
        <ContactCta company={company} />
      </main>
      <Footer />
    </>
  );
}
