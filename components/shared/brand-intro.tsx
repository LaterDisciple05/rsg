"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function BrandIntro() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const timer = setTimeout(() => {
      setIsVisible(false);
      document.body.style.overflow = "unset";
    }, 3500);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-rsg-navy"
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
        >
          {/* Surround Reveal Panels */}
          <motion.div
            initial={{ scaleX: 1 }}
            animate={{ scaleX: 0 }}
            transition={{ delay: 2.8, duration: 0.8, ease: [0.87, 0, 0.13, 1] }}
            className="absolute inset-y-0 left-0 z-20 w-1/2 origin-left bg-white"
          />
          <motion.div
            initial={{ scaleX: 1 }}
            animate={{ scaleX: 0 }}
            transition={{ delay: 2.8, duration: 0.8, ease: [0.87, 0, 0.13, 1] }}
            className="absolute inset-y-0 right-0 z-20 w-1/2 origin-right bg-white"
          />

          {/* Central Logo Focus */}
          <div className="relative z-30 flex flex-col items-center">
            {/* The "Impact" Logo Animation */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0, filter: "blur(20px)" }}
              animate={{ 
                scale: 1, 
                opacity: 1, 
                filter: "blur(0px)",
                transition: { 
                  duration: 1.2, 
                  ease: [0.16, 1, 0.3, 1] 
                } 
              }}
              className="relative h-48 w-[500px] sm:h-64 sm:w-[700px]"
            >
              <Image
                src="/rsg_logo2.png"
                alt="Rising Sun Global"
                fill
                className="object-contain"
                priority
              />
            </motion.div>

            {/* Glowing Accent Ring */}
            <motion.div 
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: 1.5, 
                opacity: [0, 0.5, 0],
                transition: { delay: 0.2, duration: 1.5, ease: "easeOut" }
              }}
              className="absolute inset-0 -z-10 rounded-full bg-rsg-orange/20 blur-3xl"
            />

            {/* Kinetic Text Reveal */}
            <div className="mt-12 flex flex-col items-center gap-4">
              <div className="h-px w-24 bg-white/20" />
              <div className="overflow-hidden">
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ 
                    y: 0, 
                    opacity: 1,
                    transition: { delay: 1, duration: 0.8, ease: "easeOut" } 
                  }}
                  className="flex flex-col items-center gap-2 text-center"
                >
                  <span className="text-sm font-black uppercase tracking-[0.6em] text-white">
                    Rising Sun Global
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-rsg-orange">
                    International Industrial Solutions
                  </span>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Subliminal Brand Message Layer (Fades out before split) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0, 1, 0],
              transition: { times: [0, 0.5, 1], delay: 1.8, duration: 1.2 }
            }}
            className="absolute bottom-12 text-center"
          >
            <p className="text-[9px] font-black uppercase tracking-[1em] text-white/30">
              Integrity • Reliability • Scale
            </p>
          </motion.div>

          {/* The Flash Effect on Reveal */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0, 1, 0],
              transition: { delay: 2.8, duration: 0.4 } 
            }}
            className="absolute inset-0 z-40 bg-white"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
