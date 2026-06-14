import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/container";

const footerLinks = [
  { name: "About", href: "/#about" },
  { name: "Services", href: "/#services" },
  { name: "Materials", href: "/#materials" },
  { name: "Why RSG", href: "/#why-rsg" },
  { name: "Contact", href: "/#contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-rsg-line bg-white py-12">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <Link
              href="/"
              className="relative block h-16 w-64"
              aria-label="Rising Sun Global home"
            >
              <Image
                src="/rsg_logo2.png"
                alt="Rising Sun Global"
                fill
                className="object-contain"
              />
            </Link>
            <p className="mt-5 max-w-xl text-sm leading-6 text-rsg-muted">
              Industrial scrap procurement, metal recovery, recycling, and
              export-focused supply from Adelaide across Australia and India.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-3">
            {footerLinks.map((link) => (
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
          <p>Scrap metal purchasing | Metal recovery | Export supply</p>
        </div>
      </Container>
    </footer>
  );
}
