import Link from "next/link";
import { ArrowDown } from "lucide-react";
import Container from "@/components/ui/container";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-rsg-navy pt-32 text-white sm:pt-40">
      <div className="absolute inset-0 rsg-industrial-grid opacity-42" />
      <div className="absolute inset-x-0 bottom-0 h-2 bg-rsg-orange" />

      <Container className="relative z-10 py-16 sm:py-20 lg:py-24">
        <div className="max-w-4xl">
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

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
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
          </div>
        </div>
      </Container>
    </section>
  );
}
