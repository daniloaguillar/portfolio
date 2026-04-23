"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";
import { siteProjects, brandingProjects, type ProjectData } from "@/lib/projects";

function ProjectCard({
  project,
  featured,
  onClick,
  viewLabel,
  isBranding,
}: {
  project: ProjectData;
  featured: boolean;
  isBranding?: boolean;
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
      className={`group cursor-none rounded-xl ${
        featured ? "col-span-1 md:col-span-2" : ""
      }`}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-hoverable
    >
      {project.image ? (
        <>
          <div className={`relative overflow-hidden rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.13)] ${
            isBranding
              ? featured ? "aspect-square md:aspect-[1903/909]" : "aspect-square md:aspect-[15/11]"
              : "aspect-[9/16] md:aspect-[1903/909]"
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

          <div className="relative overflow-hidden mt-2 bg-[#F5F5F0] border border-accent rounded-xl shadow-[0_4px_16px_rgba(0,0,0,0.08)] px-5 py-4 pb-5">
            <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: `linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)`, backgroundSize: "40px 40px" }} />
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
        <>
          <div className="relative overflow-hidden rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.13)] aspect-square md:aspect-[15/11]">
            <div className="absolute inset-0 bg-[#252525]" />
            <div
              className="absolute inset-0 opacity-[0.07]"
              style={{
                backgroundImage: `linear-gradient(#F5F5F0 1px, transparent 1px), linear-gradient(90deg, #F5F5F0 1px, transparent 1px)`,
                backgroundSize: "40px 40px",
              }}
            />
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
          <div className="relative overflow-hidden mt-2 bg-[#F5F5F0] border border-accent rounded-xl shadow-[0_4px_16px_rgba(0,0,0,0.08)] px-5 py-4 pb-5">
            <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: `linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)`, backgroundSize: "40px 40px" }} />
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
  const router = useRouter();
  const { t } = useLanguage();
  const featured = siteProjects[0];
  const restSites = siteProjects.slice(1);

  return (
    <section id="projetos" className="py-24 md:py-36 bg-black">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
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

        {/* Sites & Landing Pages */}
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
            onClick={() => router.push(`/projetos/${featured.key}`)}
            viewLabel={t.projects.view}
          />
          {restSites.map((p) => (
            <ProjectCard
              key={p.id}
              project={p}
              featured={false}
              onClick={() => router.push(`/projetos/${p.key}`)}
              viewLabel={t.projects.view}
            />
          ))}
        </div>

        {/* Identidade Visual */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionLabel label={t.projects.sectionBranding} />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          {brandingProjects.map((p) => (
            <ProjectCard
              key={p.id}
              project={p}
              featured={p.featured}
              isBranding
              onClick={() => router.push(`/projetos/${p.key}`)}
              viewLabel={t.projects.view}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
