import Container from "@/components/ui/container";

const materials = [
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

export default function Materials() {
  return (
    <section id="materials" className="bg-white py-20 sm:py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="rsg-section-kicker">Materials</p>
            <h2 className="mt-4 text-3xl font-black leading-tight text-rsg-ink sm:text-5xl">
              Materials and scrap streams RSG can discuss.
            </h2>
            <p className="mt-5 text-lg leading-8 text-rsg-muted">
              A useful scrap website should list the material categories clearly.
              Final acceptance, pricing, pickup, and documentation depend on
              quantity, location, quality, and current market conditions.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {materials.map((material) => (
              <div
                key={material}
                className="rounded-md border border-rsg-line bg-rsg-paper px-4 py-4 text-sm font-black text-rsg-ink"
              >
                {material}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
