"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";

const siteProjects = [
  {
    id: 1,
    key: "juliana" as const,
    name: "Juliana Goes",
    type: { pt: "Site institucional", en: "Institutional site", es: "Sitio institucional" },
    year: 2026,
    url: "https://www.julianagoes.com.br",
    featured: true,
    image: "/juliana-goes.webp",
    imageMobile: "/juliana-goes-mobile.webp",
    siteImage: "/juliana-goes-full.webp",
    siteImageMobile: "/juliana-goes-full-mobile.webp",
    tags: ["UI/UX Design", "Tipografia expressiva", "Identidade digital", "Webflow"],
  },
  {
    id: 2,
    key: "rm" as const,
    name: "Agência RM Digital",
    type: { pt: "Site institucional", en: "Institutional site", es: "Sitio institucional" },
    year: 2026,
    url: "https://www.agenciarmdigital.com.br",
    featured: false,
    image: "/rm-digital.webp",
    imageMobile: "/rm-digital-mobile.webp",
    siteImage: "/rm-digital-full.webp",
    siteImageMobile: "/rm-digital-full-mobile.webp",
    tags: ["UI/UX Design", "Branding digital", "Conversão", "Webflow"],
  },
  {
    id: 3,
    key: "ediane" as const,
    name: "Curso Trauma e Regulação",
    type: { pt: "Landing Page", en: "Landing Page", es: "Landing Page" },
    year: 2026,
    url: "https://www.agenciarmdigital.com.br/case-de-sucesso---ediane-ribeiro",
    featured: false,
    image: "/trauma.webp",
    imageMobile: "/trauma-mobile.webp",
    siteImage: "/trauma-full.webp",
    siteImageMobile: "/trauma-full-mobile.webp",
    tags: ["Landing Page", "Identidade visual", "Conversão", "Webflow"],
  },
  {
    id: 4,
    key: "maison" as const,
    name: "Maison Aura Beauty",
    type: { pt: "Landing Page", en: "Landing Page", es: "Landing Page" },
    year: 2025,
    url: "https://www.maisonaurabeauty.com.br",
    featured: false,
    image: "/maison.webp",
    imageMobile: "/maison-mobile.webp",
    siteImage: "/maison-full.webp",
    siteImageMobile: "/maison-full-mobile.webp",
    tags: ["Landing Page", "Design elegante", "Conversão", "Webflow"],
  },
  {
    id: 5,
    key: "fagulha" as const,
    name: "Estúdio Fagulha",
    type: { pt: "Site institucional", en: "Institutional site", es: "Sitio institucional" },
    year: 2024,
    url: "https://estudiofagulha.com.br",
    featured: false,
    image: "/fagulha.webp",
    imageMobile: "/fagulha-mobile.webp",
    siteImage: "/fagulha-full.webp",
    siteImageMobile: "/fagulha-full-mobile.webp",
    tags: ["UI/UX Design", "Direção criativa", "Motion", "Webflow"],
  },
  {
    id: 6,
    key: "convi" as const,
    name: "Convi Foods",
    type: { pt: "Landing Page", en: "Landing Page", es: "Landing Page" },
    year: 2024,
    url: "https://convi-foods---landing-page.webflow.io",
    featured: false,
    image: "/convi.webp",
    imageMobile: "/convi-mobile.webp",
    siteImage: "/convi-full.webp",
    siteImageMobile: "/convi-full-mobile.webp",
    tags: ["Landing Page", "Copywriting visual", "Alta conversão", "Webflow"],
  },
  {
    id: 7,
    key: "aprovo" as const,
    name: "Aprovo Projetos",
    type: { pt: "Site institucional", en: "Institutional site", es: "Sitio institucional" },
    year: 2025,
    url: "https://www.aprovoprojetos.com.br",
    featured: false,
    image: "/aprovo.webp",
    imageMobile: "/aprovo-mobile.webp",
    siteImage: "/aprovo-full.webp",
    siteImageMobile: "/aprovo-full-mobile.webp",
    tags: ["UI/UX Design", "Arquitetura da informação", "Geração de leads", "Webflow"],
  },
];

const brandingProjects = [
  {
    id: 8,
    key: "capitalconsorcio" as const,
    name: "Capital Consórcio",
    type: { pt: "Identidade Visual", en: "Visual Identity", es: "Identidad Visual" },
    year: 2026,
    url: "",
    featured: false,
    image: "/capitalconsorcio.webp",
    manualPages: Array.from({ length: 14 }, (_, i) => `/capitalconsorcio-manual/p${String(i + 1).padStart(2, "0")}.jpg`),
    tags: ["Logo", "Paleta de cores", "Tipografia", "Manual de marca"],
  },
  {
    id: 9,
    key: "traumaid" as const,
    name: "Curso Trauma e Regulação",
    type: { pt: "Identidade Visual", en: "Visual Identity", es: "Identidad Visual" },
    year: 2026,
    url: "",
    featured: false,
    image: "/trauma-id.webp",
    manual: "/trauma-manual.jpg",
    tags: ["Logo", "Identidade cromática", "Aplicações digitais", "Manual de marca"],
  },
  {
    id: 10,
    key: "continente" as const,
    name: "Continente Experience",
    type: { pt: "Identidade Visual", en: "Visual Identity", es: "Identidad Visual" },
    year: 2026,
    url: "",
    featured: false,
    image: "/continente.webp",
    manual: "/continente-manual.jpg",
    tags: ["Logo", "Identidade cromática", "Tipografia", "Manual de marca"],
  },
];

type ProjectData = (typeof siteProjects[0] | typeof brandingProjects[0]) & { image?: string; imageMobile?: string; siteImage?: string; siteImageMobile?: string; manual?: string; manualPages?: string[] };

function ProjectCard({
  project,
  featured,
  onClick,
  viewLabel,
}: {
  project: ProjectData;
  featured: boolean;
  onClick: () => void;
  viewLabel: string;
}) {
  const [hovered, setHovered] = useState(false);
  const { locale } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`group cursor-none rounded-xl bg-[#F5F5F0] border border-[#252525]/10 shadow-[0_4px_24px_rgba(0,0,0,0.10)] ${
        featured ? "col-span-1 md:col-span-2" : ""
      }`}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-hoverable
    >
      {project.image ? (
        <>
          {/* Imagem sem gradiente */}
          <div className={`relative overflow-hidden rounded-t-xl ${
            featured ? "aspect-[9/16] md:aspect-[1903/909]" : "aspect-[9/16] md:aspect-[1903/909]"
          }`}>
            <img
              src={project.imageMobile ?? project.image}
              alt={project.name}
              className="md:hidden absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />
            <img
              src={project.image}
              alt={project.name}
              className="hidden md:block absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
          </div>

          {/* Caption */}
          <div className="mt-1 bg-[#F5F5F0] px-5 py-4 pb-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs px-3 py-1 border border-accent/60 text-accent font-sans tracking-wide rounded-full">
                {project.type[locale]}
              </span>
              <span className="text-xs text-[#252525]/45 font-sans">{project.year}</span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <h3
                className={`font-display font-light text-[#252525] leading-tight ${
                  featured ? "text-3xl md:text-4xl" : "text-xl md:text-2xl"
                }`}
              >
                {project.name}
              </h3>
              <motion.span
                animate={hovered ? { opacity: 1, x: 0 } : { opacity: 0, x: -6 }}
                transition={{ duration: 0.25 }}
                className="text-accent text-sm font-sans shrink-0"
              >
                →
              </motion.span>
            </div>
          </div>
        </>
      ) : (
        /* Identidade Visual: capa + caption */
        <>
          <div className="relative overflow-hidden rounded-t-xl aspect-square md:aspect-[15/11]">
            {project.image ? (
              <>
                <img
                  src={project.image}
                  alt={project.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
              </>
            ) : (
              <>
                <div className="absolute inset-0 bg-[#252525]" />
                <div
                  className="absolute inset-0 opacity-[0.07]"
                  style={{
                    backgroundImage: `linear-gradient(#F5F5F0 1px, transparent 1px), linear-gradient(90deg, #F5F5F0 1px, transparent 1px)`,
                    backgroundSize: "40px 40px",
                  }}
                />
              </>
            )}
            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-500" />
            <motion.div
              animate={hovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <span className="text-xs tracking-[0.2em] uppercase text-accent font-sans font-medium">
                {viewLabel}
              </span>
            </motion.div>
          </div>
          {/* Caption */}
          <div className="mt-1 bg-[#F5F5F0] px-5 py-4 pb-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs px-3 py-1 border border-accent/60 text-accent font-sans tracking-wide rounded-full">
                {project.type[locale]}
              </span>
              <span className="text-xs text-[#252525]/45 font-sans">{project.year}</span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-xl md:text-2xl font-display font-light text-[#252525] leading-tight">
                {project.name}
              </h3>
              <motion.span
                animate={hovered ? { opacity: 1, x: 0 } : { opacity: 0, x: -6 }}
                transition={{ duration: 0.25 }}
                className="text-accent text-sm font-sans shrink-0"
              >
                →
              </motion.span>
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
}

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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-black/95 flex flex-col items-center justify-center p-4"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-5 right-6 text-white/50 hover:text-white text-2xl z-10 transition-colors cursor-none"
      >
        ✕
      </button>

      {/* Área da imagem com setas laterais */}
      <div
        className="relative flex items-center justify-center w-full"
        style={{ maxHeight: isCarousel ? "calc(100vh - 80px)" : "calc(100vh - 32px)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {isCarousel && (
          <button
            onClick={() => onPageChange!(Math.max(0, current - 1))}
            disabled={current === 0}
            className="absolute left-0 z-10 flex items-center justify-center w-10 h-10 rounded-full border border-white/20 text-white/60 hover:text-white hover:border-white/60 disabled:opacity-20 disabled:cursor-not-allowed transition-colors cursor-none bg-black/40 shrink-0"
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
          alt="Manual de marca"
          className="max-w-full object-contain rounded-lg"
          style={{ maxHeight: isCarousel ? "calc(100vh - 80px)" : "calc(100vh - 32px)", paddingLeft: isCarousel ? "56px" : "0", paddingRight: isCarousel ? "56px" : "0" }}
        />

        {isCarousel && (
          <button
            onClick={() => onPageChange!(Math.min(total - 1, current + 1))}
            disabled={current === total - 1}
            className="absolute right-0 z-10 flex items-center justify-center w-10 h-10 rounded-full border border-white/20 text-white/60 hover:text-white hover:border-white/60 disabled:opacity-20 disabled:cursor-not-allowed transition-colors cursor-none bg-black/40 shrink-0"
          >
            →
          </button>
        )}
      </div>

      {/* Contador de páginas */}
      {isCarousel && (
        <div
          className="absolute bottom-5 left-1/2 -translate-x-1/2 text-sm text-white/40 font-sans"
          onClick={(e) => e.stopPropagation()}
        >
          {current + 1} / {total}
        </div>
      )}
    </motion.div>
  );
}

function ProjectModal({
  project,
  onClose,
}: {
  project: ProjectData;
  onClose: () => void;
}) {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const [lightboxIsCarousel, setLightboxIsCarousel] = useState(false);
  const [manualPage, setManualPage] = useState(0);
  const { t, locale } = useLanguage();

  // Pré-carrega todas as páginas do manual para eliminar delay de navegação
  useEffect(() => {
    if (project.manualPages) {
      project.manualPages.forEach((src) => {
        const img = new Image();
        img.src = src;
      });
    }
  }, [project.manualPages]);
  const tp = t.projects;
  const desc = tp.items[project.key];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-end md:items-center justify-center p-4 md:p-8"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 60, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="bg-nearblack border border-offwhite/10 w-full max-w-2xl max-h-[85vh] overflow-y-auto relative rounded-xl"
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-offwhite/40 hover:text-offwhite transition-colors text-xl z-10"
          >
            ✕
          </button>
          <div className="h-1 w-full bg-accent rounded-t-xl" />
          <div className="p-8 md:p-12">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-xs px-3 py-1.5 border border-accent text-accent font-sans tracking-wide rounded-full">
                {project.type[locale]}
              </span>
              <span className="w-1 h-1 rounded-full bg-offwhite/20" />
              <span className="text-xs text-offwhite/40 font-sans">{project.year}</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-light text-offwhite mb-8 leading-tight">
              {project.name}
            </h2>
            <div className="w-12 h-px bg-accent mb-6" />

            {/* Preview do site com scroll automático */}
            {project.siteImage && (
              <>
                {/* Desktop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  className="hidden md:block relative w-full h-80 rounded-lg overflow-hidden mb-8 border border-offwhite/10"
                >
                  <img
                    src={project.siteImage}
                    alt={`${project.name} — site completo`}
                    className="w-full site-scroll-anim"
                    style={{ display: "block", willChange: "transform" }}
                  />
                </motion.div>
                {/* Mobile — proporção 1080x1350 (4:5) */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  className="block md:hidden relative w-full aspect-[4/5] rounded-lg overflow-hidden mb-8 border border-offwhite/10"
                >
                  <img
                    src={project.siteImageMobile ?? project.siteImage}
                    alt={`${project.name} — site mobile`}
                    className="w-full site-scroll-anim"
                    style={{ display: "block", willChange: "transform" }}
                  />
                </motion.div>
              </>
            )}

            {/* Manual de marca — carrossel de imagens */}
            {project.manualPages && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="mb-8"
              >
                <h4 className="text-xs tracking-[0.2em] uppercase text-offwhite/30 font-sans mb-3">
                  {tp.manualLabel}
                </h4>
                <button
                  onClick={() => { setLightboxSrc(project.manualPages![manualPage]); setLightboxIsCarousel(true); }}
                  className="relative group/img w-full rounded-lg overflow-hidden border border-offwhite/10 cursor-none block"
                >
                  <motion.img
                    key={project.manualPages[manualPage]}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.12 }}
                    src={project.manualPages[manualPage]}
                    alt={`${project.name} — Manual p.${manualPage + 1}`}
                    className="w-full block"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/60 transition-colors duration-300 flex items-center justify-center">
                    <span className="opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 text-white text-xs px-4 py-2 rounded-full font-sans tracking-wide border border-white/40">
                      {tp.expandBtn}
                    </span>
                  </div>
                </button>
                {/* Navegação entre páginas */}
                <div className="flex items-center justify-between mt-3 px-1">
                  <button
                    onClick={() => setManualPage((p) => Math.max(0, p - 1))}
                    disabled={manualPage === 0}
                    className="text-xs font-sans px-3 py-1.5 rounded border border-offwhite/20 text-offwhite/50 hover:text-offwhite hover:border-offwhite/50 disabled:opacity-20 disabled:cursor-not-allowed transition-colors cursor-none"
                  >
                    ← anterior
                  </button>
                  <span className="text-xs text-offwhite/30 font-sans">
                    {manualPage + 1} / {project.manualPages.length}
                  </span>
                  <button
                    onClick={() => setManualPage((p) => Math.min(project.manualPages!.length - 1, p + 1))}
                    disabled={manualPage === project.manualPages.length - 1}
                    className="text-xs font-sans px-3 py-1.5 rounded border border-offwhite/20 text-offwhite/50 hover:text-offwhite hover:border-offwhite/50 disabled:opacity-20 disabled:cursor-not-allowed transition-colors cursor-none"
                  >
                    próxima →
                  </button>
                </div>
              </motion.div>
            )}

            {/* Manual de marca — imagem única */}
            {project.manual && !project.manualPages && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="mb-8"
              >
                <h4 className="text-xs tracking-[0.2em] uppercase text-offwhite/30 font-sans mb-3">
                  {tp.manualLabel}
                </h4>
                <button
                  onClick={() => { setLightboxSrc(project.manual!); setLightboxIsCarousel(false); }}
                  className="relative group/img w-full rounded-lg overflow-hidden border border-offwhite/10 cursor-none block"
                >
                  <img
                    src={project.manual}
                    alt={`${project.name} — Manual de marca`}
                    className="w-full block transition-transform duration-500 group-hover/img:scale-[1.02]"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                    <span className="opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 bg-black/60 text-white text-xs px-4 py-2 rounded-full font-sans tracking-wide">
                      {tp.expandBtn}
                    </span>
                  </div>
                </button>
              </motion.div>
            )}

            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-8">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1.5 border border-accent/40 text-accent font-sans tracking-wide rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mb-6">
              <h4 className="text-xs tracking-[0.2em] uppercase text-offwhite/30 font-sans mb-3">
                {tp.aboutLabel}
              </h4>
              <p className="text-offwhite/70 font-sans leading-relaxed">{desc.description}</p>
            </div>
            <div className="mb-10">
              <h4 className="text-xs tracking-[0.2em] uppercase text-offwhite/30 font-sans mb-3">
                {tp.deliveredLabel}
              </h4>
              <p className="text-offwhite/70 font-sans leading-relaxed">{desc.deliverables}</p>
            </div>
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-light
                className="group inline-flex items-center gap-3 px-6 py-3 bg-accent text-white text-sm font-medium hover:bg-offwhite hover:text-black transition-colors duration-300 rounded-lg"
              >
                {tp.visitBtn}
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
            )}
          </div>
        </motion.div>
      </motion.div>
      <AnimatePresence>
        {lightboxSrc && (
          <ImageLightbox
            src={lightboxSrc}
            onClose={() => { setLightboxSrc(null); setLightboxIsCarousel(false); }}
            pages={lightboxIsCarousel ? project.manualPages : undefined}
            page={lightboxIsCarousel ? manualPage : undefined}
            onPageChange={lightboxIsCarousel ? (p) => setManualPage(p) : undefined}
          />
        )}
      </AnimatePresence>
    </AnimatePresence>
  );
}

function SectionLabel({ label }: { label: string }) {
  return (
    <div className="mb-12 md:mb-16">
      <span className="text-xs px-3 py-1.5 border border-accent text-accent font-sans tracking-widest uppercase rounded-full">
        {label}
      </span>
    </div>
  );
}

export default function Projects() {
  const [activeProject, setActiveProject] = useState<ProjectData | null>(null);
  const { t } = useLanguage();
  const featured = siteProjects[0];
  const restSites = siteProjects.slice(1);

  return (
    <>
      <section id="projetos" className="py-24 md:py-36 bg-black">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Título principal */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-16 md:mb-24"
          >
            <span className="line-accent" />
            <h2 className="font-display text-5xl md:text-7xl font-light text-offwhite leading-tight">
              {t.projects.sectionTitle}
            </h2>
          </motion.div>

          {/* ── Sites & Landing Pages ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SectionLabel label={t.projects.sectionSites} />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-20 md:mb-28">
            <ProjectCard
              project={featured}
              featured
              onClick={() => setActiveProject(featured)}
              viewLabel={t.projects.view}
            />
            {restSites.map((p) => (
              <ProjectCard
                key={p.id}
                project={p}
                featured={false}
                onClick={() => setActiveProject(p)}
                viewLabel={t.projects.view}
              />
            ))}
          </div>

          {/* ── Identidade Visual ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SectionLabel label={t.projects.sectionBranding} />
          </motion.div>

          <div className="grid grid-cols-2 gap-3 md:gap-4">
            {brandingProjects.map((p) => (
              <ProjectCard
                key={p.id}
                project={p}
                featured={false}
                onClick={() => setActiveProject(p)}
                viewLabel={t.projects.view}
              />
            ))}
          </div>
        </div>
      </section>

      {activeProject && (
        <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
      )}
    </>
  );
}
