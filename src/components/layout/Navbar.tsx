"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Search, Map, BarChart2, Sun, Moon, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useThemeStore } from "@/lib/stores/useThemeStore";
import clsx from "clsx";
import { flushSync } from "react-dom";

const navLinks = [
  { name: "Explore", href: "/colleges", icon: Map },
  { name: "Compare", href: "/compare", icon: BarChart2 },
  { name: "Predictor", href: "/predict", icon: Search },
];

export function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useThemeStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleThemeToggle = (e: React.MouseEvent) => {
    const x = e.clientX;
    const y = e.clientY;

    // Fallback for browsers that don't support View Transitions
    if (!document.startViewTransition) {
      toggleTheme();
      return;
    }

    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const transition = document.startViewTransition(() => {
      flushSync(() => {
        toggleTheme();
      });
    });

    transition.ready.then(() => {
      document.documentElement.animate(
        [
          { clipPath: `circle(0px at ${x}px ${y}px)` },
          { clipPath: `circle(${endRadius}px at ${x}px ${y}px)` },
        ],
        {
          duration: 500,
          easing: "ease-in-out",
          pseudoElement: "::view-transition-new(root)",
        }
      );
    });
  };

  return (
    <header
      className={clsx(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "glass border-x-transparent border-t-transparent py-3 shadow-md"
          : "bg-transparent py-5 border-transparent"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-xl bg-gradient-primary flex items-center justify-center text-white font-bold text-lg shadow-glow transition-transform group-hover:scale-110">
            U
          </div>
          <span className="text-xl font-bold tracking-tight">
            Uni<span className="text-gradient">Findr</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.name}
                href={link.href}
                className={clsx(
                  "relative px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2",
                  isActive ? "text-brand-600 dark:text-brand-400" : "hover:text-brand-600 dark:hover:text-brand-400 text-text-secondary dark:text-text-secondary"
                )}
              >
                <link.icon className="w-4 h-4" />
                {link.name}
                {isActive && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute inset-0 rounded-lg bg-brand-100 dark:bg-brand-900/30 -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={handleThemeToggle}
            className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            aria-label="Toggle dark mode"
          >
            {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          
          <button 
            className="md:hidden p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <motion.div
        initial={false}
        animate={mobileMenuOpen ? "open" : "closed"}
        variants={{
          open: { opacity: 1, height: "auto" },
          closed: { opacity: 0, height: 0, borderTopColor: "transparent" }
        }}
        className="md:hidden overflow-hidden glass border-x-transparent border-b-transparent border-t"
        style={{ borderTopColor: mobileMenuOpen ? "var(--glass-border)" : "transparent" }}
      >
        <div className="px-4 py-4 flex flex-col gap-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={clsx(
                  "px-4 py-3 rounded-xl text-base font-medium flex items-center gap-3 transition-colors",
                  isActive 
                    ? "bg-brand-100 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400" 
                    : "hover:bg-black/5 dark:hover:bg-white/5 text-text-secondary dark:text-text-secondary"
                )}
              >
                <link.icon className="w-5 h-5" />
                {link.name}
              </Link>
            );
          })}
        </div>
      </motion.div>
    </header>
  );
}
