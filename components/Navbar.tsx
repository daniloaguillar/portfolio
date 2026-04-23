"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";
import { Locale } from "@/lib/translations";
import { siteProjects, brandingProjects } from "@/lib/projects";

const locales: { code: Locale; label: string }[] = [
  { code: "pt", label: "PT" },
  { code: "en", label: "EN" },
  { code: "es", label: "ES" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { t, locale, setLocale } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLink = (href: string) => {
    setMenuOpen(false);
    if (pathname === "/") {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push(`/${href}`);
    }
  };

  const openDropdown = () => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setDropdownOpen(true);
  };

  const closeDropdown = () => {
    dropdownTimeout.current = setTimeout(() => setDropdownOpen(false), 150);
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
              if (pathname === "/") {
                window.scrollTo({ top: 0, behavior: "smooth" });
              } else {
                router.push("/");
              }
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
            {/* Projects with dropdown */}
            <div
              ref={dropdownRef}
              className="relative"
              onMouseEnter={openDropdown}
              onMouseLeave={closeDropdown}
            >
              <button
                onClick={() => handleLink("#projetos")}
                className="relative text-sm font-medium tracking-wide text-offwhite/60 hover:text-offwhite transition-colors duration-300 group flex items-center gap-1.5"
              >
                {t.nav.projects}
                <motion.span
                  animate={{ rotate: dropdownOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-[10px] opacity-50"
                >
                  ▾
                </motion.span>
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent transition-all duration-300 group-hover:w-full" />
              </button>

              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    onMouseEnter={openDropdown}
                    onMouseLeave={closeDropdown}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[480px] bg-black/98 border border-offwhite/10 rounded-xl shadow-2xl shadow-black/60 overflow-hidden"
                  >
                    <div className="h-px w-full bg-accent" />
                    <div className="p-6 grid grid-cols-2 gap-x-8 gap-y-1">
                      {/* Sites column */}
                      <div>
                        <p className="text-[10px] tracking-[0.2em] uppercase text-offwhite/25 font-sans mb-3">
                          {t.projects.sectionSites}
                        </p>
                        {siteProjects.map((p) => (
                          <Link
                            key={p.key}
                            href={`/projetos/${p.key}`}
                            onClick={() => setDropdownOpen(false)}
                            className="flex items-center gap-2 py-1.5 text-sm text-offwhite/55 hover:text-offwhite transition-colors duration-200 group/item font-sans"
                          >
                            <span className="w-1 h-1 rounded-full bg-accent/40 group-hover/item:bg-accent transition-colors duration-200 shrink-0" />
                            {p.name}
                          </Link>
                        ))}
                      </div>
                      {/* Branding column */}
                      <div>
                        <p className="text-[10px] tracking-[0.2em] uppercase text-offwhite/25 font-sans mb-3">
                          {t.projects.sectionBranding}
                        </p>
                        {brandingProjects.map((p) => (
                          <Link
                            key={p.key}
                            href={`/projetos/${p.key}`}
                            onClick={() => setDropdownOpen(false)}
                            className="flex items-center gap-2 py-1.5 text-sm text-offwhite/55 hover:text-offwhite transition-colors duration-200 group/item font-sans"
                          >
                            <span className="w-1 h-1 rounded-full bg-accent/40 group-hover/item:bg-accent transition-colors duration-200 shrink-0" />
                            {p.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                    <div className="px-6 pb-5">
                      <button
                        onClick={() => { setDropdownOpen(false); handleLink("#projetos"); }}
                        className="text-xs text-accent/70 hover:text-accent font-sans tracking-wide transition-colors duration-200"
                      >
                        {t.projects.viewAll} →
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              onClick={() => handleLink("#sobre")}
              className="relative text-sm font-medium tracking-wide text-offwhite/60 hover:text-offwhite transition-colors duration-300 group"
            >
              {t.nav.about}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent transition-all duration-300 group-hover:w-full" />
            </button>

            <button
              onClick={() => handleLink("#contato")}
              className="relative text-sm font-medium tracking-wide text-offwhite/60 hover:text-offwhite transition-colors duration-300 group"
            >
              {t.nav.contact}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent transition-all duration-300 group-hover:w-full" />
            </button>

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
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 }}
              onClick={() => handleLink("#projetos")}
              className="font-display text-5xl font-bold text-offwhite/80 hover:text-accent transition-colors duration-300"
            >
              {t.nav.projects}
            </motion.button>
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.16 }}
              onClick={() => handleLink("#sobre")}
              className="font-display text-5xl font-bold text-offwhite/80 hover:text-accent transition-colors duration-300"
            >
              {t.nav.about}
            </motion.button>
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.24 }}
              onClick={() => handleLink("#contato")}
              className="font-display text-5xl font-bold text-offwhite/80 hover:text-accent transition-colors duration-300"
            >
              {t.nav.contact}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
