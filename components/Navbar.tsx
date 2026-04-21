"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";
import { Locale } from "@/lib/translations";

const locales: { code: Locale; label: string }[] = [
  { code: "pt", label: "PT" },
  { code: "en", label: "EN" },
  { code: "es", label: "ES" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { t, locale, setLocale } = useLanguage();

  const links = [
    { label: t.nav.projects, href: "#projetos" },
    { label: t.nav.about, href: "#sobre" },
    { label: t.nav.contact, href: "#contato" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLink = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-black/95 backdrop-blur-sm shadow-lg shadow-black/30" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 md:h-20 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="group flex items-center gap-2"
          >
            <span className="font-display text-lg md:text-xl font-normal tracking-tight text-offwhite group-hover:text-accent transition-colors duration-300">
              Danilo Aguillar
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-accent"/>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10">
            {links.map((link) => (
              <button
                key={link.href}
                onClick={() => handleLink(link.href)}
                className="relative text-sm font-medium tracking-wide text-offwhite/60 hover:text-offwhite transition-colors duration-300 group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent transition-all duration-300 group-hover:w-full" />
              </button>
            ))}

            {/* Language selector */}
            <div className="flex items-center gap-1 ml-2 border-l border-offwhite/10 pl-6">
              {locales.map((l, i) => (
                <span key={l.code} className="flex items-center gap-1">
                  <button
                    onClick={() => setLocale(l.code)}
                    className={`text-xs font-sans font-medium tracking-widest transition-colors duration-200 ${
                      locale === l.code
                        ? "text-accent"
                        : "text-offwhite/30 hover:text-offwhite/60"
                    }`}
                  >
                    {l.label}
                  </button>
                  {i < locales.length - 1 && (
                    <span className="text-offwhite/15 text-xs">·</span>
                  )}
                </span>
              ))}
            </div>
          </nav>

          {/* Mobile: language + hamburger */}
          <div className="md:hidden flex items-center gap-4">
            <div className="flex items-center gap-1">
              {locales.map((l, i) => (
                <span key={l.code} className="flex items-center gap-1">
                  <button
                    onClick={() => setLocale(l.code)}
                    className={`text-[10px] font-sans font-medium tracking-widest transition-colors duration-200 ${
                      locale === l.code ? "text-accent" : "text-offwhite/30"
                    }`}
                  >
                    {l.label}
                  </button>
                  {i < locales.length - 1 && (
                    <span className="text-offwhite/15 text-[10px]">·</span>
                  )}
                </span>
              ))}
            </div>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex flex-col gap-1.5 p-2 z-50"
              aria-label="Menu"
            >
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                className="block w-6 h-px bg-offwhite"
              />
              <motion.span
                animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                className="block w-6 h-px bg-offwhite"
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                className="block w-6 h-px bg-offwhite"
              />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-black flex flex-col items-center justify-center gap-12"
          >
            {links.map((link, i) => (
              <motion.button
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 + 0.1 }}
                onClick={() => handleLink(link.href)}
                className="font-display text-5xl font-bold text-offwhite/80 hover:text-accent transition-colors duration-300"
              >
                {link.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
