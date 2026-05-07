"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function MouseGlow() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const scale = useMotionValue(1);
  
  // Spring physics: balanced for a smooth, sensitive, but lightweight feel
  const springConfig = { damping: 25, stiffness: 200, mass: 0.2 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);
  const springScale = useSpring(scale, { damping: 15, stiffness: 300 });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Offset by half the width/height (75px) to center the 150px glow on the cursor
      mouseX.set(e.clientX - 75);
      mouseY.set(e.clientY - 75);
      
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => scale.set(0.8); // Subtle shrink on click
    const handleMouseUp = () => scale.set(1); // Return to normal
    
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [mouseX, mouseY, scale, isVisible]);

  return (
    <motion.div
      style={{
        x: springX,
        y: springY,
        scale: springScale,
        opacity: isVisible ? 1 : 0,
      }}
      className="pointer-events-none fixed top-0 left-0 w-[150px] h-[150px] bg-gradient-to-br from-brand-500 via-accent-500 to-blue-500 opacity-10 dark:opacity-5 rounded-full blur-[100px] -z-20 mix-blend-multiply dark:mix-blend-screen transition-opacity duration-700"
    />
  );
}
