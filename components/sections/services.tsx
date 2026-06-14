import { Factory, Hammer, Scale, Ship } from "lucide-react";
import Container from "@/components/ui/container";

const services = [
  {
    title: "Scrap Metal Purchasing",
    body: "Buying ferrous and non-ferrous scrap from industrial sellers, contractors, workshops, and trading partners.",
    icon: Scale,
  },
  {
    title: "Demolition Metal Recovery",
    body: "Recovery support where site material, handling, and metal value need practical coordination.",
    icon: Hammer,
  },
  {
    title: "Industrial Recycling",
    body: "Useful recycling pathways for surplus, mixed, and end-of-life metal from commercial operations.",
    icon: Factory,
  },
  {
    title: "Bulk Supply & Export",
    body: "Export-focused coordination for recovered metal and scrap supply across Australia and India-linked markets.",
    icon: Ship,
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-rsg-paper py-18 sm:py-22">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <p className="rsg-section-kicker">Services</p>
            <h2 className="mt-4 text-3xl font-black leading-tight text-rsg-ink sm:text-5xl">
              Practical scrap and recovery services.
            </h2>
            <p className="mt-5 text-lg leading-8 text-rsg-muted">
              Clear service areas for sellers, contractors, recyclers, and
              trading partners.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <article
                  key={service.title}
                  className="rounded-lg border border-rsg-line bg-white p-6 shadow-sm"
                >
                  <Icon className="text-rsg-orange-dark" size={26} />
                  <h3 className="mt-5 text-xl font-black text-rsg-ink">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-base leading-7 text-rsg-muted">
                    {service.body}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
