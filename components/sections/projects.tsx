import { FileCheck2, LockKeyhole, Star } from "lucide-react";
import Container from "@/components/ui/container";

const projectPrinciples = [
  {
    title: "Published with permission",
    body: "Project details are shared only when the work can be represented clearly and professionally.",
    icon: FileCheck2,
  },
  {
    title: "Sensitive details protected",
    body: "Commercial documents, site details, and partner information are treated with appropriate discretion.",
    icon: LockKeyhole,
  },
  {
    title: "Selective spotlight",
    body: "Public case studies should show the work that best reflects RSG's capability and standards.",
    icon: Star,
  },
];

export default function Projects() {
  return (
    <section id="projects" className="bg-rsg-navy py-20 text-white sm:py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <p className="rsg-section-kicker text-rsg-orange">
              Project Showcase
            </p>
            <h2 className="mt-4 text-3xl font-black leading-tight text-white sm:text-5xl">
              Real industrial work deserves careful publication.
            </h2>
            <p className="mt-5 text-lg leading-8 text-white/76">
              RSG will showcase selected projects when the details are useful,
              approved, and strong enough to represent the company with
              confidence.
            </p>
          </div>

          <div className="grid gap-4">
            {projectPrinciples.map((principle) => {
              const Icon = principle.icon;
              return (
                <article
                  key={principle.title}
                  className="rounded-lg border border-white/14 bg-white/8 p-6"
                >
                  <Icon className="text-rsg-orange" size={25} />
                  <h3 className="mt-5 text-xl font-black text-white">
                    {principle.title}
                  </h3>
                  <p className="mt-3 text-base leading-7 text-white/72">
                    {principle.body}
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
