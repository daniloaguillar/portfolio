"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-nearblack border-t border-offwhite/5 py-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-display text-lg font-semibold text-offwhite/80">
                Danilo Aguillar
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            </div>
            <a
              href="https://daniloaguillar.com.br"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-offwhite/25 hover:text-accent transition-colors font-sans"
            >
              daniloaguillar.com.br
            </a>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs tracking-widest uppercase text-offwhite/25 hover:text-accent transition-colors font-sans"
            >
              LinkedIn
            </a>
          </div>

          <p className="text-xs text-offwhite/20 font-sans">{t.footer.copyright}</p>
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 h-px bg-gradient-to-r from-accent/40 via-offwhite/5 to-transparent origin-left"
        />
      </div>
    </footer>
  );
}
