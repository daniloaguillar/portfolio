"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";

const tags = ["UI/UX Design", "Design Gráfico", "Webflow", "Next.js", "Identidade Visual", "Motion Design"];

export default function About() {
  const { t } = useLanguage();

  return (
    <section id="sobre" className="py-24 md:py-36 bg-offwhite relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
          {/* Left — Photo placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            {/* Photo area */}
            <div className="relative aspect-[3/4] bg-black/10 overflow-hidden rounded-xl">
              {/* Decorative frame */}
              <div className="absolute -top-4 -left-4 w-full h-full border border-accent/30 pointer-events-none z-10 rounded-xl" />

              <Image
                src="/danilo.webp"
                alt="Danilo Aguillar"
                fill
                className="object-cover object-top"
                priority
              />

              {/* Accent strip */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent" />
            </div>
          </motion.div>

          {/* Right — Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="relative"
          >
            {/* Grid pattern apenas na área do texto */}
            <div
              className="absolute -inset-8 pointer-events-none"
              style={{
                backgroundImage: `linear-gradient(#252525 1px, transparent 1px), linear-gradient(90deg, #252525 1px, transparent 1px)`,
                backgroundSize: "40px 40px",
                opacity: 0.025,
              }}
            />

            <div className="relative z-10">
              <span className="line-accent bg-black" />

              <h2 className="font-display text-5xl md:text-6xl font-light text-black leading-[0.8] mb-8">
                {t.about.title}
                <br />
                <span className="italic text-accent">{t.about.titleItalic}</span>
              </h2>

              <div className="space-y-5 text-black/60 font-sans text-base leading-relaxed">
                <p>{t.about.p1}</p>
                <p>{t.about.p2}</p>
                <p>{t.about.p3}</p>
              </div>

              {/* Tags — contorno e texto vermelhos */}
              <div className="flex flex-wrap gap-2 mt-8">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-3 py-1.5 border border-accent text-accent font-sans tracking-wide rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
