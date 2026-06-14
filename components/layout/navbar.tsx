"use client";

import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Menu, MessageCircle, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "About", href: "/#about" },
  { name: "Services", href: "/#services" },
  { name: "Materials", href: "/#materials" },
  { name: "Why RSG", href: "/#why-rsg" },
  { name: "Contact", href: "/#contact" },
];

const whatsappHref =
  "https://wa.me/61432753733?text=Hello%20Rising%20Sun%20Global%2C%20I%20would%20like%20to%20discuss%20scrap%20metal%20or%20metal%20recovery.";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed left-0 right-0 top-0 z-50 border-b transition-all duration-300",
        isScrolled
          ? "border-rsg-line bg-white/96 shadow-sm backdrop-blur-md"
          : "border-rsg-line/70 bg-white/94 backdrop-blur-sm"
      )}
    >
      <div className="hidden border-b border-rsg-line bg-rsg-navy text-white lg:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-2.5 text-xs font-semibold">
          <div className="flex items-center gap-6">
            <span className="inline-flex items-center gap-2">
              <MapPin size={15} />
              Adelaide, Australia
            </span>
            <span className="text-white/60">Serving Australia and India</span>
          </div>

          <div className="flex items-center gap-6">
            <Link
              href="mailto:risingsunglobal.au@gmail.com"
              className="inline-flex items-center gap-2 text-white/88 hover:text-rsg-orange"
            >
              <Mail size={15} />
              risingsunglobal.au@gmail.com
            </Link>
            <Link
              href="tel:+61432753733"
              className="inline-flex items-center gap-2 text-white/88 hover:text-rsg-orange"
            >
              <Phone size={15} />
              +61 432 753 733
            </Link>
          </div>
        </div>
      </div>

      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-1 lg:px-8">
        <Link
          href="/"
          className="relative h-20 w-72 shrink-0 sm:h-[84px] sm:w-[320px] lg:h-[92px] lg:w-[350px]"
          aria-label="Rising Sun Global home"
          onClick={() => setIsOpen(false)}
        >
          <Image
            src="/rsg_logo2.png"
            alt="Rising Sun Global"
            fill
            className="object-contain object-left scale-150 origin-left"
            priority
          />
        </Link>

        <div className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-[0.92rem] font-semibold text-rsg-charcoal transition-colors hover:text-rsg-orange-dark"
            >
              {link.name}
            </Link>
          ))}

          <Link
            href={whatsappHref}
            className="inline-flex items-center gap-2 rounded-md bg-rsg-orange px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-rsg-orange-dark"
            target="_blank"
            rel="noreferrer"
          >
            <MessageCircle size={18} strokeWidth={2.2} />
            WhatsApp
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-rsg-line text-rsg-navy lg:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((current) => !current)}
        >
          {isOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </nav>

      {isOpen ? (
        <div className="border-t border-rsg-line bg-white px-5 py-5 shadow-lg lg:hidden">
          <div className="mx-auto grid max-w-7xl gap-2">
            <div className="rounded-md bg-rsg-paper p-3 text-sm font-semibold text-rsg-charcoal">
              Adelaide, Australia | +61 432 753 733
            </div>
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="rounded-md px-3 py-3 text-base font-semibold text-rsg-charcoal hover:bg-rsg-orange-soft hover:text-rsg-orange-dark"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="mt-3 grid grid-cols-2 gap-3">
              <Link
                href="tel:+61432753733"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-rsg-line px-4 py-3 text-sm font-bold text-rsg-navy"
                onClick={() => setIsOpen(false)}
              >
                <Phone size={18} />
                Call
              </Link>
              <Link
                href={whatsappHref}
                className="inline-flex items-center justify-center gap-2 rounded-md bg-rsg-orange px-4 py-3 text-sm font-bold text-white"
                target="_blank"
                rel="noreferrer"
                onClick={() => setIsOpen(false)}
              >
                <MessageCircle size={18} />
                WhatsApp
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
