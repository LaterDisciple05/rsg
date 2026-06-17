import Container from "@/components/ui/container";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";

type MaterialItem = {
  title: string;
};

const fallbackMaterials = [
  "Copper",
  "Brass",
  "Aluminium",
  "Steel",
  "Stainless Steel",
  "Insulated Cables",
  "Motors",
  "Batteries",
  "Alloy Rims",
  "Industrial Mixed Scrap",
  "Demolition Metal",
  "Bulk Export Lots",
];

export default function Materials({
  materials = [],
}: {
  materials?: MaterialItem[];
}) {
  const visibleMaterials = materials.length
    ? materials.map((material) => material.title)
    : fallbackMaterials;

  return (
    <section id="materials" className="bg-white py-20 sm:py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <Reveal tone="slide-left">
            <p className="rsg-section-kicker">Materials</p>
            <h2 className="mt-4 text-3xl font-black leading-tight text-rsg-ink sm:text-5xl">
              Materials and scrap streams RSG can discuss.
            </h2>
            <p className="mt-5 text-lg leading-8 text-rsg-muted">
              A useful scrap website should list the material categories clearly.
              Final acceptance, pricing, pickup, and documentation depend on
              quantity, location, quality, and current market conditions.
            </p>
          </Reveal>

          <Stagger stagger={0.045} className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {visibleMaterials.map((material) => (
              <StaggerItem
                key={material}
                tone="material"
                className="rounded-md border border-rsg-line bg-rsg-paper px-4 py-4 text-sm font-black text-rsg-ink transition-colors hover:border-rsg-orange hover:bg-rsg-orange-soft"
              >
                {material}
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Container>
    </section>
  );
}
