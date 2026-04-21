"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 180, damping: 22 });
  const springY = useSpring(y, { stiffness: 180, damping: 22 });
  const [onLight, setOnLight] = useState(false);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setOnLight(!!target.closest("[data-cursor-light]"));
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
          width: onLight ? 8 : 14,
          height: onLight ? 8 : 14,
          backgroundColor: onLight ? "#F5F5F0" : "transparent",
          borderColor: onLight ? "#F5F5F0" : "rgba(37,37,37,0.5)",
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="fixed top-0 left-0 border rounded-sm pointer-events-none z-[9999]"
      />
    </>
  );
}
