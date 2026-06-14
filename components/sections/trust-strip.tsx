import { Factory, Globe2, Recycle } from "lucide-react";
import Container from "@/components/ui/container";

type StatisticItem = {
  label: string;
  value?: string | null;
  suffix?: string | null;
};

const quickFacts = [
  {
    title: "Industrial Scrap",
    subtitle: "Ferrous and non-ferrous",
    icon: Factory,
  },
  {
    title: "Metal Recovery",
    subtitle: "Demolition and surplus streams",
    icon: Recycle,
  },
  {
    title: "Australia + India",
    subtitle: "Trade and export focus",
    icon: Globe2,
  },
];

const statisticIcons = [Factory, Recycle, Globe2];

export default function TrustStrip({
  statistics = [],
}: {
  statistics?: StatisticItem[];
}) {
  const facts = statistics.length
    ? statistics.map((statistic, index) => ({
        title: `${statistic.value ?? ""}${statistic.suffix ?? ""}`.trim() || statistic.label,
        subtitle: statistic.label,
        icon: statisticIcons[index % statisticIcons.length],
      }))
    : quickFacts;

  return (
    <section className="bg-white">
      <Container className="-mt-10 relative z-20">
        <div className="grid overflow-hidden rounded-lg border border-rsg-line bg-white shadow-xl shadow-rsg-navy/8 md:grid-cols-3">
          {facts.map((fact) => {
            const Icon = fact.icon;
            return (
              <article
                key={fact.title}
                className="flex items-center gap-4 border-b border-rsg-line p-5 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-rsg-orange-soft text-rsg-orange-dark">
                  <Icon size={22} strokeWidth={2.2} />
                </div>
                <div>
                  <h2 className="text-lg font-black text-rsg-ink">
                    {fact.title}
                  </h2>
                  <p className="mt-1 text-sm font-semibold text-rsg-muted">
                    {fact.subtitle}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
