"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";
import { getProjectBySlug, allProjects } from "@/lib/projects";

function ImageLightbox({
  src,
  onClose,
  pages,
  page,
  onPageChange,
}: {
  src: string;
  onClose: () => void;
  pages?: string[];
  page?: number;
  onPageChange?: (p: number) => void;
}) {
  const current = page ?? 0;
  const total = pages?.length ?? 1;
  const activeSrc = pages ? pages[current] : src;
  const isCarousel = !!(pages && onPageChange);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (isCarousel && e.key === "ArrowRight") onPageChange!(Math.min(total - 1, current + 1));
      if (isCarousel && e.key === "ArrowLeft") onPageChange!(Math.max(0, current - 1));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [current, total, isCarousel, onClose, onPageChange]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-black/97 flex flex-col items-center justify-center p-4"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-5 right-6 text-white/50 hover:text-white text-2xl z-10 transition-colors"
      >
        ✕
      </button>

      <div
        className="relative flex items-center justify-center"
        style={{ maxHeight: isCarousel ? "calc(100vh - 120px)" : "calc(100vh - 32px)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {isCarousel && (
          <button
            onClick={() => onPageChange!(Math.max(0, current - 1))}
            disabled={current === 0}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-10 h-10 rounded-full border border-white/20 text-white/60 hover:text-white hover:border-white/60 disabled:opacity-20 disabled:cursor-not-allowed transition-colors bg-black/40 shrink-0"
          >
            ←
          </button>
        )}

        <motion.img
          key={activeSrc}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.12 }}
          src={activeSrc}
          alt=""
          className="max-w-full object-contain rounded-lg"
          style={{
            maxHeight: isCarousel ? "calc(100vh - 120px)" : "calc(100vh - 32px)",
            paddingLeft: isCarousel ? "56px" : "0",
            paddingRight: isCarousel ? "56px" : "0",
          }}
        />

        {isCarousel && (
          <button
            onClick={() => onPageChange!(Math.min(total - 1, current + 1))}
            disabled={current === total - 1}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-10 h-10 rounded-full border border-white/20 text-white/60 hover:text-white hover:border-white/60 disabled:opacity-20 disabled:cursor-not-allowed transition-colors bg-black/40 shrink-0"
          >
            →
          </button>
        )}
      </div>

      {isCarousel && (
        <div
          className="mt-4 text-sm text-white/40 font-sans"
          onClick={(e) => e.stopPropagation()}
        >
          {current + 1} / {total}
        </div>
      )}
    </motion.div>
  );
}

/* Auto-sliding carousel for brand manual pages */
function ManualCarousel({
  pages,
  onOpenLightbox,
  expandLabel,
}: {
  pages: string[];
  onOpenLightbox: (page: number) => void;
  expandLabel: string;
}) {
  const [current, setCurrent] = useState(0);
  const [hovered, setHovered] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startAutoSlide = () => {
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % pages.length);
    }, 3000);
  };

  const stopAutoSlide = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, [pages.length]);

  const goTo = (i: number) => {
    setCurrent(i);
    stopAutoSlide();
    startAutoSlide();
  };

  const prev = () => goTo((current - 1 + pages.length) % pages.length);
  const next = () => goTo((current + 1) % pages.length);

  return (
    <div
      className="relative w-full max-w-2xl mx-auto"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image area */}
      <div
        className="relative w-full aspect-[210/297] rounded-2xl overflow-hidden border border-offwhite/10 shadow-2xl shadow-black/60 cursor-pointer"
        onClick={() => onOpenLightbox(current)}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={current}
            src={pages[current]}
            alt={`Página ${current + 1}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 w-full h-full object-contain bg-white"
          />
        </AnimatePresence>

        {/* Expand overlay */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-black/50 flex items-center justify-center"
            >
              <span className="text-white text-xs px-4 py-2 rounded-full font-sans tracking-wide border border-white/40">
                {expandLabel}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Prev / Next arrows */}
        <button
          onClick={(e) => { e.stopPropagation(); prev(); }}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-9 h-9 rounded-full bg-black/60 border border-white/20 text-white/70 hover:text-white hover:border-white/50 transition-colors"
        >
          ←
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); next(); }}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-9 h-9 rounded-full bg-black/60 border border-white/20 text-white/70 hover:text-white hover:border-white/50 transition-colors"
        >
          →
        </button>
      </div>

      {/* Dots + counter */}
      <div className="flex items-center justify-center gap-3 mt-5">
        <span className="text-xs text-offwhite/30 font-sans tabular-nums w-12 text-right">
          {current + 1} / {pages.length}
        </span>
        <div className="flex gap-1.5">
          {pages.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                i === current ? "bg-accent w-4" : "bg-offwhite/20 hover:bg-offwhite/40"
              }`}
            />
          ))}
        </div>
        <span className="w-12" />
      </div>
    </div>
  );
}

function NextProjectBar({ currentSlug }: { currentSlug: string }) {
  const router = useRouter();
  const { locale } = useLanguage();
  const idx = allProjects.findIndex((p) => p.key === currentSlug);
  const next = allProjects[(idx + 1) % allProjects.length];

  return (
    <section className="border-t border-offwhite/8 bg-black">
      <button
        onClick={() => router.push(`/projetos/${next.key}`)}
        className="w-full group px-6 md:px-12 py-12 md:py-16 flex items-center justify-between max-w-7xl mx-auto"
      >
        <div className="text-left">
          <p className="text-xs tracking-[0.2em] uppercase text-offwhite/30 font-sans mb-2">
            Próximo projeto
          </p>
          <p className="font-display text-2xl md:text-4xl font-light text-offwhite group-hover:text-accent transition-colors duration-300">
            {next.name}
          </p>
          <p className="text-xs text-offwhite/40 font-sans mt-1">{next.type[locale]}</p>
        </div>
        <span className="text-3xl text-offwhite/30 group-hover:text-accent group-hover:translate-x-2 transition-all duration-300">
          →
        </span>
      </button>
    </section>
  );
}

export default function ProjectPageContent({ slug }: { slug: string }) {
  const router = useRouter();
  const { t, locale } = useLanguage();
  const project = getProjectBySlug(slug);

  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const [lightboxIsCarousel, setLightboxIsCarousel] = useState(false);
  const [lightboxPage, setLightboxPage] = useState(0);

  useEffect(() => {
    if (project?.manualPages) {
      project.manualPages.forEach((src) => {
        const img = new Image();
        img.src = src;
      });
    }
  }, [project]);

  if (!project) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center pt-20">
        <div className="text-center">
          <p className="text-offwhite/50 font-sans mb-6">Projeto não encontrado.</p>
          <button
            onClick={() => router.push("/#projetos")}
            className="text-accent font-sans text-sm hover:underline"
          >
            ← Voltar ao portfólio
          </button>
        </div>
      </main>
    );
  }

  const tp = t.projects;
  const desc = tp.items[project.key];

  const isBrandingWithManualPages = !!project.manualPages;
  const isBrandingWithSingleManual = !!project.manual && !project.manualPages;

  const openLightboxCarousel = (page: number) => {
    setLightboxPage(page);
    setLightboxIsCarousel(true);
    setLightboxSrc(project.manualPages![page]);
  };

  const openLightboxSingle = () => {
    setLightboxIsCarousel(false);
    setLightboxSrc(project.manual!);
  };

  return (
    <>
      <main className="min-h-screen bg-black pt-20 md:pt-24">
        {/* ── Hero section ── */}
        <section className="relative bg-black overflow-hidden">
          {/* Grid pattern — same as home hero, 15% less opacity (0.06 vs 0.07) */}
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage: `linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)`,
              backgroundSize: "80px 80px",
            }}
          />

          <div className="relative z-10">
            {/* Back button */}
            <div className="max-w-7xl mx-auto px-6 md:px-12 pt-10 pb-6">
              <motion.button
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                onClick={() => router.push("/#projetos")}
                className="flex items-center gap-2 text-offwhite/40 hover:text-offwhite text-sm font-sans transition-colors duration-300 group"
              >
                <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span>
                {tp.backBtn}
              </motion.button>
            </div>

            {/* Project header */}
            <div className="max-w-7xl mx-auto px-6 md:px-12 pb-10">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="flex items-center gap-3 mb-6"
              >
                <span className="text-xs px-3 py-1.5 border border-accent text-accent font-sans tracking-wide rounded-full">
                  {project.type[locale]}
                </span>
                <span className="w-1 h-1 rounded-full bg-offwhite/20" />
                <span className="text-xs text-offwhite/40 font-sans">{project.year}</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.18 }}
                className="font-display text-5xl md:text-7xl font-light text-offwhite leading-tight mb-6"
              >
                {project.name}
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.26 }}
                className="flex flex-wrap gap-2"
              >
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-3 py-1.5 border border-accent/40 text-accent/80 font-sans tracking-wide rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </motion.div>
            </div>

            {/* ── Hero visual ── */}
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="max-w-7xl mx-auto px-6 md:px-12 pb-16"
            >
              {/* Site preview */}
              {project.siteImage && (
                <>
                  <div
                    className="hidden md:block relative w-full rounded-2xl overflow-hidden border border-offwhite/10 shadow-2xl shadow-black/60"
                    style={{ height: "70vh" }}
                  >
                    <img
                      src={project.siteImage}
                      alt={`${project.name} — site completo`}
                      className="w-full site-scroll-anim"
                      style={{ display: "block", willChange: "transform" }}
                    />
                  </div>
                  <div className="block md:hidden relative w-full aspect-[4/5] rounded-2xl overflow-hidden border border-offwhite/10 shadow-2xl shadow-black/60">
                    <img
                      src={project.siteImageMobile ?? project.siteImage}
                      alt={`${project.name} — site mobile`}
                      className="w-full site-scroll-anim"
                      style={{ display: "block", willChange: "transform" }}
                    />
                  </div>
                </>
              )}

              {/* Brand manual — auto-sliding carousel (capitalconsorcio) */}
              {isBrandingWithManualPages && (
                <ManualCarousel
                  pages={project.manualPages!}
                  onOpenLightbox={openLightboxCarousel}
                  expandLabel={tp.expandBtn}
                />
              )}

              {/* Brand manual — single image (traumaid, continente) */}
              {isBrandingWithSingleManual && (
                <div className="relative max-w-3xl mx-auto">
                  <button
                    onClick={openLightboxSingle}
                    className="relative group/img w-full rounded-2xl overflow-hidden border border-offwhite/10 shadow-2xl shadow-black/60 block cursor-pointer"
                  >
                    <img
                      src={project.manual!}
                      alt={`${project.name} — Identidade Visual`}
                      className="w-full block"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                      <span className="opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 bg-black/60 text-white text-xs px-4 py-2 rounded-full font-sans tracking-wide">
                        {tp.expandBtn}
                      </span>
                    </div>
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </section>

        {/* ── Content section ── */}
        <section className="bg-nearblack border-t border-offwhite/8">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
            <div className={`grid grid-cols-1 gap-16 md:gap-24 ${project.image && !project.siteImage ? "md:grid-cols-2" : "md:grid-cols-2"}`}>
              {/* Left: about + deliverables */}
              <div>
                <div className="mb-10">
                  <h4 className="text-[10px] tracking-[0.25em] uppercase text-offwhite/30 font-sans mb-4">
                    {tp.aboutLabel}
                  </h4>
                  <p className="text-offwhite/75 font-sans leading-relaxed text-base md:text-lg">
                    {desc.description}
                  </p>
                </div>
                <div className="mb-10">
                  <h4 className="text-[10px] tracking-[0.25em] uppercase text-offwhite/30 font-sans mb-4">
                    {tp.deliveredLabel}
                  </h4>
                  <p className="text-offwhite/75 font-sans leading-relaxed text-base md:text-lg">
                    {desc.deliverables}
                  </p>
                </div>
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 px-6 py-3 bg-accent text-white text-sm font-medium hover:bg-offwhite hover:text-black transition-colors duration-300 rounded-lg"
                  >
                    {tp.visitBtn}
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </a>
                )}
              </div>

              {/* Right: brand cover for branding projects */}
              {!project.siteImage && project.image && (
                <div className="flex flex-col justify-center">
                  <div className="relative w-full rounded-xl overflow-hidden border border-offwhite/10 shadow-lg">
                    <img
                      src={project.image}
                      alt={`${project.name} — capa`}
                      className="w-full block"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Next project nav */}
        <NextProjectBar currentSlug={slug} />
      </main>

      <AnimatePresence>
        {lightboxSrc && (
          <ImageLightbox
            src={lightboxSrc}
            onClose={() => { setLightboxSrc(null); setLightboxIsCarousel(false); }}
            pages={lightboxIsCarousel ? project.manualPages : undefined}
            page={lightboxIsCarousel ? lightboxPage : undefined}
            onPageChange={lightboxIsCarousel ? (p) => { setLightboxPage(p); setLightboxSrc(project.manualPages![p]); } : undefined}
          />
        )}
      </AnimatePresence>
    </>
  );
}
