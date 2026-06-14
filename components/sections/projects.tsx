import Image from "next/image";
import { FileCheck2, LockKeyhole, Star } from "lucide-react";
import Container from "@/components/ui/container";

type PublicProject = {
  id: string;
  title: string;
  description?: string | null;
  category?: string | null;
  status: string;
  country?: { name: string } | null;
  industry?: { title: string } | null;
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

function projectMeta(project: PublicProject) {
  return [
    project.category,
    project.industry?.title,
    project.country?.name,
    project.status ? project.status.toLowerCase() : null,
  ]
    .filter(Boolean)
    .join(" / ");
}

export default function Projects({
  projects = [],
}: {
  projects?: PublicProject[];
}) {
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

          {projects.length ? (
            <div className="grid gap-4">
              {projects.map((project) => {
                const image = project.images?.[0];
                const imageSrc = image?.url?.startsWith("/")
                  ? `/uploads${image.url}`
                  : null;

                return (
                  <article
                    key={project.id}
                    className="overflow-hidden rounded-lg border border-white/14 bg-white/8"
                  >
                    {imageSrc ? (
                      <div className="relative aspect-[16/8] w-full">
                        <Image
                          src={imageSrc}
                          alt={image?.alt || project.title}
                          fill
                          sizes="(min-width: 1024px) 48vw, 100vw"
                          className="object-cover"
                        />
                      </div>
                    ) : null}
                    <div className="p-6">
                      <p className="text-xs font-black uppercase tracking-[0.14em] text-rsg-orange">
                        {projectMeta(project) || "Public project"}
                      </p>
                      <h3 className="mt-3 text-xl font-black text-white">
                        {project.title}
                      </h3>
                      <p className="mt-3 text-base leading-7 text-white/72">
                        {project.description ||
                          "Contact Rising Sun Global for more details about this project."}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
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
          )}
        </div>
      </Container>
    </section>
  );
}
