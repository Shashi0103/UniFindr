"use client";

import { useEffect, useState } from "react";
import { useThemeStore } from "@/lib/stores/useThemeStore";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme } = useThemeStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      if (theme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, [theme, mounted]);

  // Prevent hydration mismatch flash by rendering nothing until mounted,
  // or render children but script tag in layout handles initial class.
  // We'll just render children. 
  return <>{children}</>;
}
