"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";

type MotionTone =
  | "rise"
  | "fade"
  | "slide-left"
  | "slide-right"
  | "scale"
  | "hero"
  | "image"
  | "panel"
  | "card"
  | "material"
  | "contact";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  tone?: MotionTone;
};

type StaggerProps = {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
};

type StaggerItemProps = {
  children: React.ReactNode;
  className?: string;
  tone?: MotionTone;
};

const easeOut = [0.16, 1, 0.3, 1] as const;
const revealViewport = { once: true, margin: "0px 0px -10% 0px", amount: 0.2 };

const revealVariants: Record<MotionTone, Variants> = {
  rise: {
    hidden: { opacity: 0, y: 22 },
    show: { opacity: 1, y: 0 },
  },
  fade: {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  },
  "slide-left": {
    hidden: { opacity: 0, x: 24 },
    show: { opacity: 1, x: 0 },
  },
  "slide-right": {
    hidden: { opacity: 0, x: -24 },
    show: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.982, y: 14 },
    show: { opacity: 1, scale: 1, y: 0 },
  },
  hero: {
    hidden: {
      opacity: 0,
      y: 28,
      clipPath: "inset(14% 0 0 0)",
    },
    show: {
      opacity: 1,
      y: 0,
      clipPath: "inset(0% 0 0 0)",
    },
  },
  image: {
    hidden: { opacity: 0, scale: 1.025, y: 12 },
    show: { opacity: 1, scale: 1, y: 0 },
  },
  panel: {
    hidden: { opacity: 0, y: 24, scale: 0.992 },
    show: { opacity: 1, y: 0, scale: 1 },
  },
  card: {
    hidden: { opacity: 0, y: 18, scale: 0.99 },
    show: { opacity: 1, y: 0, scale: 1 },
  },
  material: {
    hidden: { opacity: 0, y: 10, clipPath: "inset(0 18% 0 0)" },
    show: { opacity: 1, y: 0, clipPath: "inset(0 0% 0 0)" },
  },
  contact: {
    hidden: { opacity: 0, y: 14, scale: 0.99 },
    show: { opacity: 1, y: 0, scale: 1 },
  },
};

export function Reveal({
  children,
  className = "",
  delay = 0,
  tone = "rise",
}: RevealProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : "hidden"}
      whileInView={reduceMotion ? undefined : "show"}
      viewport={revealViewport}
      variants={reduceMotion ? undefined : revealVariants[tone]}
      transition={{ duration: 0.72, delay, ease: easeOut }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function Stagger({
  children,
  className = "",
  stagger = 0.08,
}: StaggerProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : "hidden"}
      whileInView={reduceMotion ? undefined : "show"}
      viewport={revealViewport}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: stagger,
            delayChildren: 0.04,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = "",
  tone = "card",
}: StaggerItemProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      variants={reduceMotion ? undefined : revealVariants[tone]}
      transition={{ duration: 0.58, ease: easeOut }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
