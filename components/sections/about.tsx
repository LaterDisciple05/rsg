import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import Container from "@/components/ui/container";

type CompanyContent = {
  name?: string | null;
  about?: string | null;
  mission?: string | null;
  vision?: string | null;
};

const fallbackPoints = [
  "Scrap metal purchasing for industrial and commercial sellers.",
  "Recovery-minded support for demolition and surplus metal streams.",
  "Export and bulk supply mindset across Australia and India-linked markets.",
];

export default function About({ company }: { company?: CompanyContent | null }) {
  const points = [company?.mission, company?.vision]
    .filter((item): item is string => Boolean(item?.trim()))
    .concat(fallbackPoints)
    .slice(0, 3);

  return (
    <section id="about" className="bg-white py-20 sm:py-24">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_0.95fr] lg:items-center">
          <div>
            <p className="rsg-section-kicker">
              About {company?.name || "Rising Sun Global"}
            </p>
            <h2 className="mt-4 max-w-3xl text-3xl font-black leading-tight text-rsg-ink sm:text-5xl">
              An industrial scrap company with a global trade mindset.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-rsg-muted">
              {company?.about ||
                "Rising Sun Global works around scrap procurement, industrial metal recovery, recycling, and export-focused supply. The website should create trust quickly, then guide serious visitors toward a direct business conversation."}
            </p>

            <div className="mt-8 grid gap-4">
              {points.map((item) => (
                <div key={item} className="flex gap-3">
                  <CheckCircle2
                    className="mt-1 shrink-0 text-rsg-orange"
                    size={20}
                  />
                  <p className="text-base leading-7 text-rsg-charcoal">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-lg border border-rsg-line bg-rsg-paper shadow-sm">
            <Image
              src="/rsg_front.jpeg"
              alt="Rising Sun Global director contact card"
              width={1586}
              height={973}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
