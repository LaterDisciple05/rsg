import { Factory, Globe2, Recycle } from "lucide-react";
import Container from "@/components/ui/container";
import { Stagger, StaggerItem } from "@/components/motion/reveal";

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
      <Container className="relative z-20 -mt-7">
        <Stagger
          stagger={0.08}
          className="grid overflow-hidden rounded-md border border-rsg-line bg-white shadow-xl shadow-rsg-navy/10 md:grid-cols-3"
        >
          {facts.map((fact) => {
            const Icon = fact.icon;
            return (
              <StaggerItem
                key={fact.title}
                tone="scale"
                className="group relative flex min-h-[112px] items-center gap-4 border-b border-rsg-line px-5 py-5 last:border-b-0 md:border-b-0 md:border-r md:px-6 md:last:border-r-0"
              >
                <div className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-rsg-orange transition-transform duration-500 group-hover:scale-x-100" />
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-rsg-orange-soft text-rsg-orange-dark ring-1 ring-rsg-orange/10 transition-transform duration-300 group-hover:-translate-y-0.5">
                  <Icon size={22} strokeWidth={2.2} />
                </div>
                <div className="min-w-0">
                  <h2 className="text-[1.05rem] font-black leading-tight text-rsg-ink">
                    {fact.title}
                  </h2>
                  <p className="mt-2 text-sm font-semibold leading-5 text-rsg-muted">
                    {fact.subtitle}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Container>
    </section>
  );
}
