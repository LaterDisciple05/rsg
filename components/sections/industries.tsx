import {
  Building2,
  Cable,
  Container as ContainerIcon,
  Factory,
  Truck,
} from "lucide-react";
import Container from "@/components/ui/container";

const industries = [
  { name: "Manufacturing", icon: Factory },
  { name: "Construction", icon: Building2 },
  { name: "Demolition", icon: Truck },
  { name: "Metal Trading", icon: Cable },
  { name: "Export Supply", icon: ContainerIcon },
];

export default function Industries() {
  return (
    <section id="industries" className="bg-white py-20 sm:py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="rsg-section-kicker">Industries</p>
            <h2 className="mt-4 text-3xl font-black leading-tight text-rsg-ink sm:text-5xl">
              Built for B2B industrial conversations.
            </h2>
          </div>
          <p className="text-lg leading-8 text-rsg-muted">
            The site focuses on buyers, suppliers, demolition teams, industrial
            operators, and trading partners who need confidence before they pick
            up the phone.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {industries.map((industry) => {
            const Icon = industry.icon;
            return (
              <div
                key={industry.name}
                className="rounded-lg border border-rsg-line bg-rsg-paper p-5"
              >
                <Icon className="text-rsg-navy" size={26} strokeWidth={2.1} />
                <p className="mt-5 text-lg font-black text-rsg-ink">
                  {industry.name}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
