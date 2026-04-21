"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";

export default function Contact() {
  const { t } = useLanguage();
  const whatsappUrl = "https://wa.me/5500000000000";

  return (
    <section id="contato" className="py-24 md:py-36 bg-black relative overflow-hidden">
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden"
        aria-hidden
      >
        <span className="font-display text-[20vw] font-black watermark-text leading-none select-none whitespace-nowrap">
          {t.nav.contact}
        </span>
      </div>

      <div className="absolute left-6 md:left-12 top-0 bottom-0 w-px bg-offwhite/5" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl"
        >
          <span className="line-accent" />

          <h2 className="font-display text-5xl md:text-7xl font-light text-offwhite leading-tight mb-6">
            {t.contact.line1}
            <br />
            {t.contact.line2}{" "}
            <span className="italic text-accent">{t.contact.line2italic}</span>
          </h2>

          <p className="text-offwhite/40 font-sans mb-4 leading-relaxed">{t.contact.sub}</p>
          <p className="text-sm text-offwhite/25 font-sans mb-12">{t.contact.note}</p>

          <motion.a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            data-cursor-light
            className="inline-flex items-center gap-4 px-8 py-5 bg-accent text-white font-medium rounded-lg"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            <span>{t.contact.cta}</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </motion.a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-4"
        >
          <div className="w-px h-24 bg-offwhite/10" />
          <span className="text-xs tracking-[0.3em] text-offwhite/15 uppercase font-sans rotate-90 whitespace-nowrap">
            daniloaguillar.com.br
          </span>
          <div className="w-px h-24 bg-offwhite/10" />
        </motion.div>
      </div>
    </section>
  );
}
