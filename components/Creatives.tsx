"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";
import { creatives, creativeSrc, type Creative } from "@/lib/creatives";

// Distribui as peças em colunas na ordem de leitura (linha a linha),
// em vez do fluxo vertical do CSS columns.
function useColumnCount() {
  const [cols, setCols] = useState(2);
  useEffect(() => {
    const update = () => setCols(window.innerWidth >= 1024 ? 4 : window.innerWidth >= 768 ? 3 : 2);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return cols;
}

function CreativeTile({
  creative,
  label,
  slidesLabel,
  onClick,
}: {
  creative: Creative;
  label: string;
  slidesLabel: string;
  onClick: () => void;
}) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      onClick={onClick}
      className="group relative block w-full overflow-hidden rounded-xl bg-nearblack text-left"
      style={{ aspectRatio: `${creative.w} / ${creative.h}` }}
      aria-label={label}
      data-hoverable
    >
      <img
        src={creativeSrc(creative, 0, true)}
        alt={label}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      {creative.slides && (
        <span className="absolute top-3 right-3 flex items-center gap-1.5 text-[10px] font-sans tracking-wide px-2.5 py-1 rounded-full bg-[#252525]/80 text-[#F5F5F0] backdrop-blur-sm">
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden>
            <rect x="0.5" y="2.5" width="8" height="9" rx="1.5" stroke="currentColor" />
            <path d="M3.5 0.5h6.5a1.5 1.5 0 0 1 1.5 1.5v7" stroke="currentColor" />
          </svg>
          {creative.slides} {slidesLabel}
        </span>
      )}
      <div className="absolute inset-x-0 bottom-0 p-3 md:p-4 bg-gradient-to-t from-[#252525]/70 via-[#252525]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <span className="text-xs px-3 py-1 border border-[#F5F5F0]/60 text-[#F5F5F0] font-sans tracking-wide rounded-full">
          {label}
        </span>
      </div>
    </motion.button>
  );
}

function Lightbox({
  index,
  slide,
  label,
  onClose,
  onNavigate,
  onSlide,
}: {
  index: number;
  slide: number;
  label: (c: Creative) => string;
  onClose: () => void;
  onNavigate: (i: number) => void;
  onSlide: (s: number) => void;
}) {
  const creative = creatives[index];
  const total = creatives.length;
  const slides = creative.slides ?? 0;

  const next = () => {
    if (slides && slide < slides - 1) onSlide(slide + 1);
    else onNavigate((index + 1) % total);
  };
  const prev = () => {
    if (slides && slide > 0) onSlide(slide - 1);
    else onNavigate((index - 1 + total) % total);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[200] bg-[#1a1a1a]/95 backdrop-blur-sm flex flex-col items-center justify-center px-4 py-16"
      onClick={onClose}
      data-cursor-light
    >
      <button
        onClick={onClose}
        className="absolute top-5 right-6 text-white/50 hover:text-white text-2xl z-10 transition-colors"
        aria-label="Fechar"
      >
        ✕
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); prev(); }}
        className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-white/15 text-white/60 hover:text-white hover:border-accent transition-colors z-10"
        aria-label="Anterior"
      >
        ←
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); next(); }}
        className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-white/15 text-white/60 hover:text-white hover:border-accent transition-colors z-10"
        aria-label="Próximo"
      >
        →
      </button>

      <AnimatePresence mode="wait">
        <motion.img
          key={`${creative.id}-${slide}`}
          src={creativeSrc(creative, slide)}
          alt={label(creative)}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => e.stopPropagation()}
          className="max-w-full max-h-[calc(100vh-140px)] w-auto h-auto rounded-lg shadow-2xl object-contain"
        />
      </AnimatePresence>

      <div className="mt-5 flex items-center gap-4 font-sans text-xs text-white/60" onClick={(e) => e.stopPropagation()}>
        <span className="text-white/85 tracking-wide">{label(creative)}</span>
        {slides > 0 && (
          <span className="flex items-center gap-1.5">
            {Array.from({ length: slides }).map((_, i) => (
              <button
                key={i}
                onClick={() => onSlide(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${i === slide ? "w-5 bg-accent" : "w-1.5 bg-white/30 hover:bg-white/60"}`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </span>
        )}
        <span className="text-white/35">{index + 1} / {total}</span>
      </div>
    </motion.div>
  );
}

export default function Creatives() {
  const { t } = useLanguage();
  const cols = useColumnCount();
  const [open, setOpen] = useState<number | null>(null);
  const [slide, setSlide] = useState(0);

  const label = (c: Creative) => c.client || t.projects.creativesPersonal;
  const columns: { c: Creative; i: number }[][] = Array.from({ length: cols }, () => []);
  creatives.forEach((c, i) => columns[i % cols].push({ c, i }));

  const openAt = (i: number) => { setOpen(i); setSlide(0); };

  return (
    <div id="criativos" className="mt-20 md:mt-28 scroll-mt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-12 md:mb-16 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <span className="self-start text-xs px-3 py-1.5 border border-accent text-accent font-sans tracking-widest uppercase rounded-full">
          {t.projects.sectionCreatives}
        </span>
        <p className="text-sm font-sans text-offwhite/50">{t.projects.creativesSub}</p>
      </motion.div>

      <div className="flex gap-3 md:gap-4 items-start">
        {columns.map((col, ci) => (
          <div key={ci} className="flex-1 min-w-0 flex flex-col gap-3 md:gap-4">
            {col.map(({ c, i }) => (
              <CreativeTile
                key={c.id}
                creative={c}
                label={label(c)}
                slidesLabel={t.projects.creativesSlides}
                onClick={() => openAt(i)}
              />
            ))}
          </div>
        ))}
      </div>

      <AnimatePresence>
        {open !== null && (
          <Lightbox
            index={open}
            slide={slide}
            label={label}
            onClose={() => setOpen(null)}
            onNavigate={openAt}
            onSlide={setSlide}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
