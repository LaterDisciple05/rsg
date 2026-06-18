import Link from "next/link";
import { Download } from "lucide-react";
import { rsgIconPack } from "@/components/icons";

const categories = ["Trade", "Operations", "Content", "Contact"] as const;

const palette = [
  { name: "Navy", className: "text-rsg-navy" },
  { name: "Orange", className: "text-rsg-orange-dark" },
  { name: "Metal", className: "text-rsg-metal" },
  { name: "White", className: "bg-rsg-navy text-white" },
];

export default function IconPackPage() {
  return (
    <main className="min-h-screen bg-rsg-paper px-5 py-10 text-rsg-ink">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 border-b border-rsg-line pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="rsg-section-kicker">RSG Icon Pack</p>
            <h1 className="mt-4 max-w-4xl text-4xl font-black leading-tight sm:text-6xl">
              Soft tile icon system for Rising Sun Global.
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-rsg-muted">
              Clean orange stroke icons with a soft rounded background, built
              for scrap import export, demolition, recycling, bulk export,
              materials, services, contact and trust signals.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href="/rsg-icons/rsg-icon-pack.svg"
              download="rsg-icon-pack.svg"
              className="inline-flex w-fit items-center justify-center gap-2 rounded-md bg-rsg-navy px-5 py-3 text-sm font-black text-white hover:bg-rsg-orange-dark"
            >
              <Download size={17} />
              SVG sheet
            </a>
            <Link
              href="/"
              className="inline-flex w-fit items-center justify-center rounded-md border border-rsg-line bg-white px-5 py-3 text-sm font-black text-rsg-navy hover:border-rsg-orange hover:text-rsg-orange-dark"
            >
              Back to site
            </Link>
          </div>
        </div>

        <section className="grid gap-3 border-b border-rsg-line py-8 sm:grid-cols-2 lg:grid-cols-4">
          {palette.map((tone) => (
            <div
              key={tone.name}
              className={`rounded-md border border-rsg-line p-5 ${tone.className}`}
            >
              <p className="text-xs font-black uppercase tracking-[0.16em]">
                {tone.name}
              </p>
              <div className="mt-5 flex items-center gap-4">
                {rsgIconPack.slice(0, 4).map(({ key, Icon }) => (
                  <Icon key={key} size={42} />
                ))}
              </div>
            </div>
          ))}
        </section>

        <div className="grid gap-12 py-10">
          {categories.map((category) => {
            const icons = rsgIconPack.filter((icon) => icon.category === category);

            return (
              <section key={category}>
                <div className="mb-5 flex items-center gap-4">
                  <h2 className="text-2xl font-black text-rsg-ink">
                    {category}
                  </h2>
                  <div className="h-px flex-1 bg-rsg-line" />
                </div>

                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {icons.map(({ key, label, Icon }) => (
                    <article
                      key={key}
                      className="group rounded-md border border-rsg-line bg-white p-7 shadow-sm transition-all hover:-translate-y-1 hover:border-rsg-orange hover:shadow-md"
                    >
                      <div className="flex items-start justify-between gap-5">
                        <div className="flex h-28 w-28 items-center justify-center text-rsg-orange-dark transition-transform group-hover:-translate-y-0.5">
                          <Icon size={104} />
                        </div>
                        <span className="rounded-full border border-rsg-line px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-rsg-muted">
                          SVG
                        </span>
                      </div>

                      <h3 className="mt-6 text-lg font-black text-rsg-ink">
                        {label}
                      </h3>
                      <p className="mt-2 text-xs font-bold uppercase tracking-[0.14em] text-rsg-orange-dark">
                        {key}
                      </p>
                      <a
                        href={`/rsg-icons/${key}.svg`}
                        download={`${key}.svg`}
                        className="mt-5 inline-flex items-center gap-2 rounded-md border border-rsg-line px-3 py-2 text-xs font-black text-rsg-navy transition-colors hover:border-rsg-orange hover:text-rsg-orange-dark"
                      >
                        <Download size={15} />
                        Download SVG
                      </a>
                    </article>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </main>
  );
}
