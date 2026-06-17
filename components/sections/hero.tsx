import Link from "next/link";
import Image from "next/image";
import { ArrowDown } from "lucide-react";
import Container from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";

export default function Hero() {
  return (
    <section className="relative min-h-[70vh] w-full overflow-hidden bg-rsg-navy pt-32 text-white sm:pt-40 lg:min-h-[80vh]">
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1671362935207-d9abfc5b9509?q=80&w=2070&auto=format&fit=crop"
          alt="Scrap metal yard with industrial metal waste"
          fill
          className="rsg-hero-drift object-cover opacity-50 grayscale-[20%]"
          priority
          sizes="100vw"
        />
        {/* Simple Gradient Overlay for Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-rsg-navy via-rsg-navy/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-rsg-navy via-transparent to-transparent" />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 z-10 rsg-industrial-grid opacity-20" />
      
      {/* Bottom Accent Line */}
      <div className="absolute inset-x-0 bottom-0 z-20 h-2 bg-rsg-orange" />

      <Container className="relative z-30 py-16 sm:py-20 lg:py-24">
        <Reveal tone="hero" className="max-w-4xl">
          <p className="rsg-section-kicker text-rsg-orange">
            Rising Sun Global
          </p>

          <div className="mt-5 space-y-6">
            <h1 className="max-w-4xl text-5xl font-black leading-[1.04] text-white sm:text-6xl lg:text-7xl">
              Industrial scrap procurement and metal recovery.
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-white/82 sm:text-xl">
              Scrap purchasing, recovery, recycling, and export-focused supply
              from Adelaide across Australia and India.
            </p>
          </div>

          <Reveal tone="scale" delay={0.14} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/#services"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-rsg-orange px-6 py-4 text-base font-bold text-white transition-colors hover:bg-rsg-orange-dark"
            >
              <ArrowDown size={20} />
              Explore Services
            </Link>
            <Link
              href="/#materials"
              className="inline-flex items-center justify-center rounded-md border border-white/28 px-6 py-4 text-base font-bold text-white transition-colors hover:bg-white/10"
            >
              Materials We Handle
            </Link>
          </Reveal>
        </Reveal>
      </Container>
    </section>
  );
}
