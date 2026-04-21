"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const dotX = useMotionValue(0);
  const dotY = useMotionValue(0);
  const springX = useSpring(dotX, { stiffness: 200, damping: 20 });
  const springY = useSpring(dotY, { stiffness: 200, damping: 20 });
  const [onInteractive, setOnInteractive] = useState(false);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = !!(
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[data-hoverable]")
      );
      setOnInteractive(interactive);
    };

    window.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseover", handleOver);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseover", handleOver);
    };
  }, [dotX, dotY]);

  return (
    <>
      {/* Dot — branco em interativos (visível sobre coral), coral no resto */}
      <motion.div
        style={{ x: dotX, y: dotY, translateX: "-50%", translateY: "-50%" }}
        animate={{ backgroundColor: onInteractive ? "#F5F5F0" : "#e86869" }}
        transition={{ duration: 0.15 }}
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9999]"
      />
      {/* Ring */}
      <motion.div
        style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          borderColor: onInteractive ? "rgba(245,245,240,0.5)" : "rgba(232,104,105,0.4)",
        }}
        transition={{ duration: 0.15 }}
        className="fixed top-0 left-0 w-9 h-9 border rounded-full pointer-events-none z-[9998]"
      />
    </>
  );
}
