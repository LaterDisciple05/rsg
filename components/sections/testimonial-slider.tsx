"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type PublicTestimonial = {
  id: string;
  customerName?: string | null;
  companyName?: string | null;
  message?: string | null;
};

const TESTIMONIAL_AUTOPLAY_MS = 3600;

export default function TestimonialSlider({ testimonials }: { testimonials: PublicTestimonial[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const directionRef = useRef<1 | -1>(1);
  const reduceMotion = useReducedMotion();

  const total = testimonials.length;
  // On desktop we show 3, so we can slide until the last 3 are visible
  const maxIndex = Math.max(0, total - 3);
  const visibleIndex = Math.min(activeIndex, maxIndex);

  const nextSlide = useCallback(() => {
    directionRef.current = 1;
    setActiveIndex((current) => {
      const next = current + 1;
      return next > maxIndex ? current : next;
    });
  }, [maxIndex]);

  const prevSlide = useCallback(() => {
    directionRef.current = -1;
    setActiveIndex((current) => {
      const prev = current - 1;
      return prev < 0 ? 0 : prev;
    });
  }, []);

  const autoSlide = useCallback(() => {
    setActiveIndex((current) => {
      if (maxIndex <= 0) return 0;
      const currentIndex = Math.min(current, maxIndex);

      if (directionRef.current === 1 && currentIndex >= maxIndex) {
        directionRef.current = -1;
        return Math.max(currentIndex - 1, 0);
      }

      if (directionRef.current === -1 && currentIndex <= 0) {
        directionRef.current = 1;
        return Math.min(currentIndex + 1, maxIndex);
      }

      return currentIndex + directionRef.current;
    });
  }, [maxIndex]);

  useEffect(() => {
    if (isPaused || total <= 3 || maxIndex <= 0) return;
    const interval = setInterval(autoSlide, TESTIMONIAL_AUTOPLAY_MS);
    return () => clearInterval(interval);
  }, [autoSlide, isPaused, total, maxIndex]);

  if (!total) return null;

  return (
    <div 
      className="group relative mt-12"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="overflow-hidden">
        <div 
          className="flex transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]"
          style={{ 
            transform: `translateX(-${(visibleIndex / total) * 100}%)`,
            width: `${(total / 3) * 100}%` 
          }}
        >
          {testimonials.map((t, index) => (
            <div 
              key={t.id} 
              className="px-2.5" 
              style={{ width: `${100 / total}%` }}
            >
              <motion.article
                className="h-full rounded-xl border border-rsg-line bg-rsg-paper p-8 shadow-sm transition-all hover:border-rsg-orange/30 hover:shadow-md"
                animate={
                  reduceMotion
                    ? undefined
                    : {
                        opacity:
                          index >= visibleIndex && index <= visibleIndex + 2
                            ? 1
                            : 0.45,
                        y:
                          index >= visibleIndex && index <= visibleIndex + 2
                            ? 0
                            : 10,
                      }
                }
                whileHover={reduceMotion ? undefined : { y: -4 }}
                transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
              >
                <Quote className="text-rsg-orange" size={28} />
                <p className="mt-6 text-base leading-relaxed text-rsg-ink italic">
                  &quot;{t.message || "Exceptional industrial service and reliable metal recovery partnership."}&quot;
                </p>
                <div className="mt-8 border-t border-rsg-line pt-5">
                  <h3 className="text-base font-black text-rsg-ink">
                    {t.customerName || "Industry Partner"}
                  </h3>
                  {t.companyName && (
                    <p className="mt-1 text-sm font-bold text-rsg-muted uppercase tracking-wider">
                      {t.companyName}
                    </p>
                  )}
                </div>
              </motion.article>
            </div>
          ))}
        </div>
      </div>

      {total > 3 && (
        <>
          <button
            onClick={prevSlide}
            disabled={visibleIndex === 0}
            className="absolute -left-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-rsg-line bg-white text-rsg-navy shadow-lg transition-all enabled:hover:bg-rsg-orange enabled:hover:text-white enabled:hover:border-rsg-orange disabled:opacity-30 disabled:cursor-not-allowed focus:outline-none lg:opacity-0 lg:group-hover:opacity-100 lg:group-hover:-translate-x-2"
            aria-label="Previous testimonials"
          >
            <ChevronLeft size={20} strokeWidth={2.5} />
          </button>
          
          <button
            onClick={nextSlide}
            disabled={visibleIndex >= maxIndex}
            className="absolute -right-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-rsg-line bg-white text-rsg-navy shadow-lg transition-all enabled:hover:bg-rsg-orange enabled:hover:text-white enabled:hover:border-rsg-orange disabled:opacity-30 disabled:cursor-not-allowed focus:outline-none lg:opacity-0 lg:group-hover:opacity-100 lg:group-hover:translate-x-2"
            aria-label="Next testimonials"
          >
            <ChevronRight size={20} strokeWidth={2.5} />
          </button>

          <div className="mt-8 flex justify-center gap-2">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  directionRef.current = i >= visibleIndex ? 1 : -1;
                  setActiveIndex(i);
                }}
                className={cn(
                  "h-1.5 transition-all duration-300 rounded-full",
                  visibleIndex === i
                    ? "w-6 bg-rsg-orange" 
                    : "w-1.5 bg-rsg-line hover:bg-rsg-metal"
                )}
                aria-label={`Go to testimonial set ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
