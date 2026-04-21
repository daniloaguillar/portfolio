"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";

export default function Hero() {
  const { t } = useLanguage();

  const scrollToProjects = () => {
    const el = document.querySelector("#projetos");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen bg-black flex flex-col justify-end pb-20 md:pb-28 overflow-hidden">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Decorative vertical line */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        className="absolute left-6 md:left-12 top-0 w-px h-full bg-accent/20 origin-top"
      />

      {/* Year tag */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 1.2 }}
        className="absolute left-0 top-1/2 -translate-y-1/2 -rotate-90 origin-left ml-6 md:ml-12"
        style={{ transformOrigin: "0 50%" }}
      >
        <span className="text-xs tracking-[0.3em] text-offwhite/30 uppercase font-sans">
          {t.hero.year}
        </span>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10 pt-24 md:pt-28">
        {/* Kicker */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex items-center gap-3 mb-8 md:mb-12"
        >
          <div className="w-8 h-px bg-accent" />
          <span className="text-xs tracking-[0.25em] text-accent uppercase font-sans font-medium">
            {t.hero.tag}
          </span>
        </motion.div>

        {/* Headline — sem overflow-hidden para não cortar descenders */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
          className="font-display text-[13vw] md:text-[9vw] lg:text-[8vw] font-light leading-[1.05] tracking-tight text-offwhite"
        >
          {t.hero.line1}
        </motion.h1>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.72 }}
          className="font-display text-[13vw] md:text-[9vw] lg:text-[8vw] font-normal leading-[1.05] tracking-tight italic text-accent mb-6 md:mb-8"
        >
          {t.hero.line2}
        </motion.h1>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.84 }}
          className="font-display text-[7vw] md:text-[5vw] lg:text-[4.5vw] font-light leading-[0.95] tracking-tight text-offwhite/50"
        >
          {t.hero.line3}
        </motion.h2>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.92 }}
          className="font-display text-[7vw] md:text-[5vw] lg:text-[4.5vw] font-light leading-[0.95] tracking-tight text-offwhite/50 mb-12 md:mb-16"
        >
          {t.hero.line4}
        </motion.h2>

        {/* Bottom row: subtexto + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="flex flex-col md:flex-row md:items-end gap-8 md:gap-0 md:justify-between"
        >
          <p className="text-sm md:text-base text-offwhite/40 font-sans max-w-md leading-relaxed">
            {t.hero.sub.split("\n").map((line, i) => (
              <span key={i}>
                {line}
                {i < t.hero.sub.split("\n").length - 1 && <br />}
              </span>
            ))}
          </p>

          <button
            onClick={scrollToProjects}
            data-cursor-light
            className="inline-flex items-center gap-4 px-8 py-4 bg-accent text-white text-sm font-medium tracking-wide rounded-lg"
          >
            <span>{t.hero.cta}</span>
            <span>→</span>
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-8 right-6 md:right-12 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] tracking-[0.3em] text-offwhite/20 uppercase rotate-90 origin-center mb-4">
          scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-12 bg-gradient-to-b from-accent/60 to-transparent"
        />
      </motion.div>
    </section>
  );
}
