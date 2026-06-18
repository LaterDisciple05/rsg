import Image from "next/image";
import Link from "next/link";
import { BadgeCheck } from "lucide-react";
import Container from "@/components/ui/container";
import type { SectionVisibilitySettings } from "@/lib/section-visibility";

type FooterLink = {
  name: string;
  href: string;
  section?: keyof SectionVisibilitySettings;
};

const footerLinks: FooterLink[] = [
  { name: "About", href: "/#about" },
  { name: "Services", href: "/#services" },
  { name: "Materials", href: "/#materials" },
  { name: "Projects", href: "/#projects", section: "projects" },
  { name: "Testimonials", href: "/#testimonials", section: "testimonials" },
  { name: "Why RSG", href: "/#why-rsg", section: "whyRsg" },
  { name: "Contact", href: "/#contact" },
];

const abnNumber = "48 497 120 461";

type FooterProps = {
  sectionVisibility?: SectionVisibilitySettings;
};

export default function Footer({ sectionVisibility }: FooterProps) {
  const visibleFooterLinks = footerLinks.filter(
    (link) => !link.section || sectionVisibility?.[link.section] !== false,
  );

  return (
    <footer className="border-t border-rsg-line bg-white py-12">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <Link
              href="/"
              className="relative -ml-30 block h-32 w-96"
              aria-label="Rising Sun Global home"
            >
              <Image
                src="/rsg_logo2.png"
                alt="Rising Sun Global"
                fill
                className="object-contain scale-150 origin-left"
              />
            </Link>
            <p className="mt-5 max-w-xl text-sm leading-6 text-rsg-muted">
              Industrial scrap procurement, metal recovery, recycling, and
              export-focused supply from Adelaide across Australia and India.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-rsg-line bg-rsg-paper px-3.5 py-2 text-xs font-black uppercase tracking-[0.12em] text-rsg-navy">
              <BadgeCheck size={15} className="text-rsg-orange-dark" />
              Registered ABN No. {abnNumber}
            </div>
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-3">
            {visibleFooterLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-bold text-rsg-charcoal hover:text-rsg-orange-dark"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-rsg-line pt-6 text-sm text-rsg-muted sm:flex-row sm:items-center sm:justify-between">
          <p>Copyright {new Date().getFullYear()} Rising Sun Global.</p>
          <p>ABN No. {abnNumber} | Scrap metal purchasing | Metal recovery | Export supply</p>
        </div>
      </Container>
    </footer>
  );
}
