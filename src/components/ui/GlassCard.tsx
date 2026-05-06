"use client";

import { motion } from "framer-motion";
import clsx from "clsx";
import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
  delay?: number;
  onClick?: () => void;
}

export function GlassCard({ children, className, hoverEffect = false, delay = 0, onClick }: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      whileHover={hoverEffect ? { y: -5, scale: 1.02 } : undefined}
      onClick={onClick}
      className={clsx(
        "glass-card overflow-hidden",
        hoverEffect && "cursor-pointer transition-shadow hover:shadow-glow",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
