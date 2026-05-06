"use client";

import { motion } from "framer-motion";
import clsx from "clsx";
import { ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  className?: string;
}

export function Button({ 
  children, 
  variant = "primary", 
  size = "md", 
  href, 
  className,
  ...props 
}: ButtonProps) {
  const baseClasses = "relative inline-flex items-center justify-center font-medium transition-colors overflow-hidden rounded-xl z-10";
  
  const variants = {
    primary: "bg-gradient-primary text-white shadow-lg hover:shadow-glow",
    secondary: "bg-brand-100 text-brand-700 dark:bg-brand-900/40 dark:text-brand-300 hover:bg-brand-200 dark:hover:bg-brand-800/60",
    outline: "border-2 border-brand-500 text-brand-600 dark:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-900/20",
    ghost: "text-text-secondary hover:text-brand-600 dark:hover:text-brand-400 hover:bg-black/5 dark:hover:bg-white/5",
  };
  
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-5 py-2.5 text-base",
    lg: "px-8 py-3.5 text-lg",
  };

  const combinedClasses = clsx(baseClasses, variants[variant], sizes[size], className);

  const MotionComponent = motion.button;

  if (href) {
    return (
      <Link href={href} className={combinedClasses}>
        {children}
      </Link>
    );
  }

  return (
    <MotionComponent
      whileTap={{ scale: 0.96 }}
      className={combinedClasses}
      {...(props as any)}
    >
      {children}
    </MotionComponent>
  );
}
