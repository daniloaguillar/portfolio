"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 180, damping: 22 });
  const springY = useSpring(y, { stiffness: 180, damping: 22 });
  const [state, setState] = useState<"default" | "accent" | "light">("default");

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("[data-cursor-light]")) {
        setState("light");
      } else if (
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[data-hoverable]")
      ) {
        setState("accent");
      } else {
        setState("default");
      }
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
          width: state === "default" ? 14 : 8,
          height: state === "default" ? 14 : 8,
          backgroundColor:
            state === "light" ? "#F5F5F0" : state === "accent" ? "#e86869" : "transparent",
          borderColor:
            state === "light" ? "#F5F5F0" : state === "accent" ? "#e86869" : "rgba(37,37,37,0.5)",
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="fixed top-0 left-0 border rounded-sm pointer-events-none z-[9999]"
      />
    </>
  );
}
