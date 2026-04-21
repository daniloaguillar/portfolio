"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 24 });
  const springY = useSpring(y, { stiffness: 260, damping: 24 });
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

  const color = onInteractive ? "#e86869" : "#252525";
  const gap = 5;
  const len = onInteractive ? 6 : 9;

  return (
    <>
      {/* Crosshair — quatro traços em cruz com gap no centro */}
      <motion.svg
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        width="40"
        height="40"
        viewBox="-20 -20 40 40"
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
      >
        {/* top */}
        <motion.line
          animate={{ x1: 0, y1: -(gap + len), x2: 0, y2: -gap, stroke: color }}
          transition={{ duration: 0.2 }}
          strokeWidth={onInteractive ? 2 : 1.5}
        />
        {/* bottom */}
        <motion.line
          animate={{ x1: 0, y1: gap, x2: 0, y2: gap + len, stroke: color }}
          transition={{ duration: 0.2 }}
          strokeWidth={onInteractive ? 2 : 1.5}
        />
        {/* left */}
        <motion.line
          animate={{ x1: -(gap + len), y1: 0, x2: -gap, y2: 0, stroke: color }}
          transition={{ duration: 0.2 }}
          strokeWidth={onInteractive ? 2 : 1.5}
        />
        {/* right */}
        <motion.line
          animate={{ x1: gap, y1: 0, x2: gap + len, y2: 0, stroke: color }}
          transition={{ duration: 0.2 }}
          strokeWidth={onInteractive ? 2 : 1.5}
        />
        {/* ponto central apenas em hover */}
        {onInteractive && (
          <motion.circle
            cx={0}
            cy={0}
            r={1.5}
            fill="#e86869"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.15 }}
          />
        )}
      </motion.svg>

      {/* Trailing square — segue com spring */}
      <motion.div
        style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          borderColor: onInteractive ? "rgba(232,104,105,0.55)" : "rgba(37,37,37,0.25)",
          rotate: onInteractive ? 45 : 0,
          width: onInteractive ? 14 : 20,
          height: onInteractive ? 14 : 20,
        }}
        transition={{ duration: 0.25 }}
        className="fixed top-0 left-0 border pointer-events-none z-[9998]"
      />
    </>
  );
}
