"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function BrandIntro() {
  const [isVisible, setIsVisible] = useState(true);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;

    document.body.style.overflow = "hidden";

    const timer = setTimeout(() => {
      setIsVisible(false);
      document.body.style.overflow = "unset";
    }, 2100);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "unset";
    };
  }, [reduceMotion]);

  useEffect(() => {
    if (reduceMotion) return;

    const replayIntro = () => {
      document.body.style.overflow = "hidden";
      setIsVisible(true);

      window.setTimeout(() => {
        setIsVisible(false);
        document.body.style.overflow = "unset";
      }, 2100);
    };

    window.addEventListener("trigger-rsg-intro", replayIntro);

    return () => window.removeEventListener("trigger-rsg-intro", replayIntro);
  }, [reduceMotion]);

  return (
    <AnimatePresence>
      {isVisible && !reduceMotion ? (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-white"
          exit={{
            y: "-100%",
            transition: { duration: 0.72, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          <div className="absolute inset-0 rsg-card-pattern opacity-60" />
          <div className="absolute inset-x-0 bottom-0 h-2 bg-rsg-orange" />

          <div className="relative z-10 flex flex-col items-center px-6">
            <motion.div
              initial={{ opacity: 0, y: 26, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="relative h-32 w-[320px] sm:h-44 sm:w-[520px]"
            >
              <Image
                src="/rsg_logo2.png"
                alt="Rising Sun Global"
                fill
                className="object-contain"
                priority
              />
            </motion.div>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.55, duration: 0.75, ease: "circOut" }}
              className="mt-8 h-[3px] w-44 origin-left bg-rsg-orange"
            />

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 0.55 }}
              className="mt-5 text-center text-xs font-black uppercase tracking-[0.32em] text-rsg-navy"
            >
              Industrial Leadership | Global Scale
            </motion.p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
