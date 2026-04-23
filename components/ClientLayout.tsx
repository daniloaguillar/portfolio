"use client";

import { LanguageProvider } from "@/lib/LanguageContext";
import CustomCursor from "./CustomCursor";
import BackToTop from "./BackToTop";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <CustomCursor />
      <BackToTop />
      <Navbar />
      {children}
      <Footer />
    </LanguageProvider>
  );
}
