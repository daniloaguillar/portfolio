"use client";

import { useState } from "react";
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
    tags: ["Logo", "Identidade cromática", "Aplicações digitais", "Manual de marca"],
  },
];

type ProjectData = (typeof siteProjects[0] | typeof brandingProjects[0]) & { image?: string; imageMobile?: string; siteImage?: string; siteImageMobile?: string };

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
      className={`relative overflow-hidden group cursor-none rounded-xl ${
        featured
          ? "col-span-1 md:col-span-2 aspect-[9/16] md:aspect-[1903/909]"
          : project.image
            ? "aspect-[9/16] md:aspect-[1903/909]"
            : "aspect-[9/16] md:aspect-[4/3]"
      }`}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-hoverable
    >
      {project.image ? (
        <>
          {/* Mobile: alinhada pelo topo */}
          <img
            src={project.imageMobile ?? project.image}
            alt={project.name}
            className="md:hidden absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
          />
          {/* Desktop */}
          <img
            src={project.image}
            alt={project.name}
            className="hidden md:block absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* Gradiente apenas no 1/3 inferior */}
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to top, #252525 0%, rgba(37,37,37,0.75) 18%, rgba(37,37,37,0.2) 28%, transparent 33%)" }}
          />
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

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-500" />

      {/* Conteúdo — tudo na base */}
      <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
        <motion.div
          animate={hovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.3 }}
          className="mb-2"
        >
          <span className="text-xs tracking-[0.2em] uppercase text-accent font-sans font-medium">
            {viewLabel}
          </span>
        </motion.div>
        {/* Badge acima do título */}
        <span className="inline-flex mb-2 text-xs px-3 py-1.5 border border-accent text-accent font-sans tracking-wide rounded-full w-fit">
          {project.type[locale]}
        </span>
        {/* Título + ano na mesma linha */}
        <div className="flex items-end justify-between gap-4">
          <h3
            className={`font-display font-light text-white leading-tight ${
              featured ? "text-4xl md:text-6xl" : "text-2xl md:text-3xl"
            }`}
          >
            {project.name}
          </h3>
          <span className="text-xs text-white/30 font-sans shrink-0 mb-1">{project.year}</span>
        </div>
      </div>

      <motion.div
        animate={hovered ? { opacity: 1 } : { opacity: 0 }}
        className="absolute inset-0 border border-accent/30 pointer-events-none rounded-xl"
      />
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
  const { t, locale } = useLanguage();
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
                <div className="hidden md:block relative w-full h-80 rounded-lg overflow-hidden mb-8 border border-offwhite/10">
                  <img
                    src={project.siteImage}
                    alt={`${project.name} — site completo`}
                    className="w-full site-scroll-anim"
                    style={{ display: "block", willChange: "transform" }}
                  />
                </div>
                {/* Mobile — proporção 1080x1350 (4:5) */}
                <div className="block md:hidden relative w-full aspect-[4/5] rounded-lg overflow-hidden mb-8 border border-offwhite/10">
                  <img
                    src={project.siteImageMobile ?? project.siteImage}
                    alt={`${project.name} — site mobile`}
                    className="w-full site-scroll-anim"
                    style={{ display: "block", willChange: "transform" }}
                  />
                </div>
              </>
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
                className="group inline-flex items-center gap-3 px-6 py-3 bg-accent text-white text-sm font-medium hover:bg-offwhite hover:text-black transition-colors duration-300 rounded-lg"
              >
                {tp.visitBtn}
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
            )}
          </div>
        </motion.div>
      </motion.div>
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
