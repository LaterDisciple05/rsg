"use client";

import Image from "next/image";
import { useEffect, useState, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

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

function projectMeta(project: PublicProject) {
  return [
    project.category,
    project.industry,
    project.country,
    project.status ? project.status.toLowerCase() : null,
  ]
    .filter(Boolean)
    .join(" / ");
}

const PROJECT_AUTOPLAY_MS = 3600;

export default function ProjectSlider({ projects }: { projects: PublicProject[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const directionRef = useRef<1 | -1>(1);
  const reduceMotion = useReducedMotion();
  const lastIndex = Math.max(projects.length - 1, 0);
  const visibleIndex = Math.min(activeIndex, lastIndex);

  const nextSlide = useCallback(() => {
    directionRef.current = 1;
    setActiveIndex((current) => (current === projects.length - 1 ? 0 : current + 1));
  }, [projects.length]);

  const prevSlide = useCallback(() => {
    directionRef.current = -1;
    setActiveIndex((current) => (current === 0 ? projects.length - 1 : current - 1));
  }, [projects.length]);

  const autoSlide = useCallback(() => {
    setActiveIndex((current) => {
      const lastIndex = projects.length - 1;

      if (lastIndex <= 0) return 0;
      const currentIndex = Math.min(current, lastIndex);

      if (directionRef.current === 1 && currentIndex >= lastIndex) {
        directionRef.current = -1;
        return Math.max(currentIndex - 1, 0);
      }

      if (directionRef.current === -1 && currentIndex <= 0) {
        directionRef.current = 1;
        return Math.min(currentIndex + 1, lastIndex);
      }

      return currentIndex + directionRef.current;
    });
  }, [projects.length]);

  useEffect(() => {
    if (isPaused || projects.length <= 1) return;
    const interval = setInterval(autoSlide, PROJECT_AUTOPLAY_MS);
    return () => clearInterval(interval);
  }, [autoSlide, isPaused, projects.length]);

  if (!projects.length) return null;

  return (
    <div 
      className="group relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="overflow-hidden rounded-xl border border-white/14 bg-white/5 shadow-2xl backdrop-blur-sm">
        <div 
          className="flex transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]"
          style={{ transform: `translateX(-${visibleIndex * 100}%)` }}
        >
          {projects.map((project, idx) => {
            const image = project.images?.[0];
            // Fix: Construct the URL relative to our custom /uploads route
            const imageSrc = image?.url ? `/uploads${image.url}` : null;

            return (
              <motion.article
                key={project.id}
                className="w-full shrink-0 flex flex-col"
                animate={
                  reduceMotion
                    ? undefined
                    : {
                        opacity: visibleIndex === idx ? 1 : 0.55,
                        scale: visibleIndex === idx ? 1 : 0.985,
                      }
                }
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-rsg-navy-deep">
                  {imageSrc ? (
                    <Image
                      src={imageSrc}
                      alt={image?.alt || project.title}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      priority={idx === 0}
                      unoptimized // Helpful for local uploads to bypass Next.js Image Optimization caching issues
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-white/10 font-black text-6xl uppercase tracking-tighter select-none">
                        RSG Project
                      </div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-rsg-navy/60 to-transparent" />
                </div>
                
                <div className="p-8 sm:p-10">
                  <div className="flex flex-wrap items-center gap-3">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-rsg-orange">
                      {projectMeta(project) || "Selected Reference"}
                    </p>
                    <div className="h-px w-8 bg-white/20" />
                  </div>
                  
                  <h3 className="mt-4 text-2xl font-black text-white sm:text-3xl">
                    {project.title}
                  </h3>
                  
                  <p className="mt-5 text-base leading-relaxed text-white/70 line-clamp-3 sm:text-lg">
                    {project.description ||
                      "Detailed industrial project execution by Rising Sun Global. Focused on efficiency, safety, and sustainable metal recovery standards."}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>

      {/* Controls */}
      {projects.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute -left-5 top-1/2 -translate-y-12 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-rsg-navy text-white shadow-xl transition-all hover:scale-105 hover:bg-rsg-orange hover:border-rsg-orange focus:outline-none sm:-left-6 lg:opacity-0 lg:group-hover:opacity-100 lg:group-hover:-translate-x-2"
            aria-label="Previous project"
          >
            <ChevronLeft size={24} strokeWidth={2.5} />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute -right-5 top-1/2 -translate-y-12 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-rsg-navy text-white shadow-xl transition-all hover:scale-105 hover:bg-rsg-orange hover:border-rsg-orange focus:outline-none sm:-right-6 lg:opacity-0 lg:group-hover:opacity-100 lg:group-hover:translate-x-2"
            aria-label="Next project"
          >
            <ChevronRight size={24} strokeWidth={2.5} />
          </button>

          {/* Indicators */}
          <div className="mt-8 flex justify-center gap-2.5">
            {projects.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  directionRef.current = i >= visibleIndex ? 1 : -1;
                  setActiveIndex(i);
                }}
                className={cn(
                  "h-1.5 transition-all duration-300 rounded-full",
                  i === visibleIndex 
                    ? "w-8 bg-rsg-orange" 
                    : "w-2 bg-white/20 hover:bg-white/40"
                )}
                aria-label={`Go to project ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
