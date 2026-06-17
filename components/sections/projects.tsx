import { FileCheck2, LockKeyhole, Star } from "lucide-react";
import Container from "@/components/ui/container";
import ProjectSlider from "./project-slider";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";

type PublicProject = {
  id: string;
  title: string;
  description?: string | null;
  category?: string | null;
  status: string;
  country?: string | null;
  industry?: string | null;
  images?: { id: string; url: string; alt?: string | null }[];
};

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

export default function Projects({
  projects = [],
}: {
  projects?: PublicProject[];
}) {
  return (
    <section id="projects" className="bg-rsg-navy py-20 text-white sm:py-24">
      <Container>
        <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <Reveal tone="slide-right">
            <p className="rsg-section-kicker text-rsg-orange">
              Project Showcase
            </p>
            <h2 className="mt-4 text-4xl font-black leading-tight text-white sm:text-6xl">
              Industrial scale. <br/>Global standards.
            </h2>
            <p className="mt-6 text-lg leading-8 text-white/76 max-w-md">
              Explore selected industrial references and metal recovery projects executed by Rising Sun Global across Australia and India.
            </p>
            
            <div className="mt-10 hidden lg:grid">
              {projectPrinciples.map((p) => {
                const Icon = p.icon;
                return (
                  <div
                    key={p.title}
                    className="mb-6 flex gap-4 transition-transform duration-300 hover:translate-x-1 last:mb-0"
                  >
                    <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-rsg-orange/10 text-rsg-orange">
                      <Icon size={14} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">{p.title}</p>
                      <p className="mt-1 text-xs leading-relaxed text-white/50">{p.body}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>

          <Reveal tone="panel" delay={0.12} className="relative min-h-[400px]">
            {projects.length ? (
              <ProjectSlider projects={projects} />
            ) : (
              <Stagger stagger={0.1} className="grid gap-4">
                {projectPrinciples.map((principle) => {
                  const Icon = principle.icon;
                  return (
                    <StaggerItem
                      key={principle.title}
                      tone="scale"
                      className="rounded-lg border border-white/14 bg-white/8 p-6"
                    >
                      <Icon className="text-rsg-orange" size={25} />
                      <h3 className="mt-5 text-xl font-black text-white">
                        {principle.title}
                      </h3>
                      <p className="mt-3 text-base leading-7 text-white/72">
                        {principle.body}
                      </p>
                    </StaggerItem>
                  );
                })}
              </Stagger>
            )}
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
