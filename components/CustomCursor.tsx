"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 180, damping: 22 });
  const springY = useSpring(y, { stiffness: 180, damping: 22 });
  const [onInteractive, setOnInteractive] = useState(false);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
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
  }, [x, y]);

  return (
    <>
      {/* Quadrado vazado — segue com spring leve */}
      <motion.div
        style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: onInteractive ? 8 : 14,
          height: onInteractive ? 8 : 14,
          backgroundColor: onInteractive ? "#e86869" : "transparent",
          borderColor: onInteractive ? "#e86869" : "rgba(37,37,37,0.5)",
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="fixed top-0 left-0 border pointer-events-none z-[9999]"
      />
    </>
  );
}
