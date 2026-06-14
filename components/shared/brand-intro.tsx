"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useCallback } from "react";
import Image from "next/image";

export default function BrandIntro() {
  const [isVisible, setIsVisible] = useState(true);

  const startIntro = useCallback(() => {
    setIsVisible(true);
    document.body.style.overflow = "hidden";
    
    const timer = setTimeout(() => {
      setIsVisible(false);
      document.body.style.overflow = "unset";
    }, 4000);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "unset";
    };
  }, []);

  useEffect(() => {
    startIntro();

    const handleTrigger = () => startIntro();
    window.addEventListener("trigger-rsg-intro", handleTrigger);

    return () => {
      window.removeEventListener("trigger-rsg-intro", handleTrigger);
      document.body.style.overflow = "unset";
    };
  }, [startIntro]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-white"
          exit={{ 
            opacity: 0,
            y: "-100%",
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
          }}
        >
          {/* Subtle Clean Grid Pattern */}
          <div className="absolute inset-0 opacity-[0.03] rsg-industrial-grid" />

          {/* Central Experience */}
          <div className="relative z-10 flex flex-col items-center">
            
            {/* Massive Logo Entrance - "The Float & Focus" */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ 
                scale: 1, 
                opacity: 1, 
                y: 0,
                transition: { 
                  duration: 1.5, 
                  ease: [0.16, 1, 0.3, 1] 
                } 
              }}
              className="relative h-64 w-[600px] sm:h-80 sm:w-[900px]"
            >
              <Image
                src="/rsg_logo2.png"
                alt="Rising Sun Global"
                fill
                className="object-contain"
                priority
              />
              
              {/* Refined Shine Effect */}
              <motion.div 
                initial={{ x: "-150%" }}
                animate={{ x: "150%" }}
                transition={{ delay: 1.2, duration: 1.5, ease: "easeInOut" }}
                className="absolute inset-0 z-20 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12"
              />
            </motion.div>

            {/* Architectural Lettering Reveal */}
            <div className="mt-12 overflow-hidden px-4">
              <motion.div
                initial={{ y: "100%" }}
                animate={{ 
                  y: 0,
                  transition: { delay: 0.8, duration: 1, ease: [0.33, 1, 0.68, 1] } 
                }}
                className="flex flex-col items-center gap-4"
              >
                <h1 className="text-xl font-black uppercase tracking-[0.8em] text-rsg-navy">
                  Rising Sun Global
                </h1>
                
                {/* Expanding Precision Line */}
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: 160 }}
                  transition={{ delay: 1.5, duration: 1.2, ease: "circOut" }}
                  className="h-[2px] bg-rsg-orange"
                />

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2, duration: 1 }}
                  className="text-xs font-bold uppercase tracking-[0.4em] text-rsg-charcoal/60"
                >
                  Industrial Leadership • Global Scale
                </motion.p>
              </motion.div>
            </div>
          </div>

          {/* Liquid Corner Reveals (Professional Surprise) */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.1 }}
            transition={{ delay: 0.2, duration: 2, ease: "easeOut" }}
            className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-rsg-orange/20 blur-3xl"
          />
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.1 }}
            transition={{ delay: 0.4, duration: 2, ease: "easeOut" }}
            className="absolute -right-20 -bottom-20 h-80 w-80 rounded-full bg-rsg-navy/20 blur-3xl"
          />

          {/* Final Transition Veil (White Flash to Website) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0, 1, 0],
              transition: { delay: 3.2, duration: 0.8 } 
            }}
            className="absolute inset-0 z-50 bg-white"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
