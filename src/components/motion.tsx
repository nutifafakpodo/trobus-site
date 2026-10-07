import { motion, useReducedMotion, useSpring, type Variants } from "framer-motion";
import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Shared motion vocabulary.
 *
 * Two rules hold across the whole site:
 *
 *  1. Every animated component calls `useReducedMotion` and renders a static
 *     equivalent when the user has asked for less motion. Nothing is merely
 *     slowed down — reveals that depend on animation to become visible must
 *     render already-visible, or the content disappears for those users.
 *  2. One easing curve and one distance scale, so independent sections still
 *     feel like one document rather than a pile of effects.
 */

/** Expo-out. Quick to leave, slow to settle — reads as confident, not bouncy. */
export const EASE = [0.22, 1, 0.36, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

/** Fades content up as it scrolls into view. */
export function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "span";
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[Tag];

  if (reduce) return <Tag className={className}>{children}</Tag>;

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: EASE, delay }}
    >
      {children}
    </MotionTag>
  );
}

/**
 * Reveals children one after another.
 * Pair with `StaggerItem`; the parent owns the timing so items stay in step.
 */
export function Stagger({
  children,
  className,
  gap = 0.08,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  gap?: number;
  as?: "div" | "ul" | "section";
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[Tag];

  if (reduce) return <Tag className={className}>{children}</Tag>;

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: "-60px" }}
      variants={{ shown: { transition: { staggerChildren: gap } } }}
    >
      {children}
    </MotionTag>
  );
}

export function StaggerItem({
  children,
  className,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "li";
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[Tag];

  if (reduce) return <Tag className={className}>{children}</Tag>;

  return (
    <MotionTag className={className} variants={fadeUp}>
      {children}
    </MotionTag>
  );
}

/**
 * Tilts slightly toward the cursor.
 *
 * Pointer-driven only: it adds nothing on touch and would fight with scrolling,
 * so it is skipped unless the device actually has a fine pointer.
 */
export function Magnetic({
  children,
  className,
  strength = 6,
}: {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}) {
  const reduce = useReducedMotion();
  const [hasPointer, setHasPointer] = React.useState(false);
  const x = useSpring(0, { stiffness: 150, damping: 15 });
  const y = useSpring(0, { stiffness: 150, damping: 15 });

  React.useEffect(() => {
    setHasPointer(window.matchMedia("(hover: hover) and (pointer: fine)").matches);
  }, []);

  if (reduce || !hasPointer) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      style={{ x, y }}
      onPointerMove={(event) => {
        const box = event.currentTarget.getBoundingClientRect();
        const dx = (event.clientX - (box.left + box.width / 2)) / (box.width / 2);
        const dy = (event.clientY - (box.top + box.height / 2)) / (box.height / 2);
        x.set(dx * strength);
        y.set(dy * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

/** Section shell: consistent rhythm and max width across the page. */
export function Section({
  children,
  className,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn("relative px-5 py-24 sm:px-8 sm:py-32", className)}>
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </section>
  );
}

/** Small uppercase label that sits above a section heading. */
export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-route-400">{children}</p>
  );
}
