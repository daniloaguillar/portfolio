import type { Metadata } from "next";
import { Fraunces } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";

const playfair = Fraunces({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

const BASE_URL = "https://www.daniloaguillar.com.br";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Danilo Aguillar | Designer de UI/UX e Identidade Visual",
    template: "%s | Danilo Aguillar",
  },
  description:
    "Portfólio de Danilo Aguillar, designer gráfico e de interfaces. Crio sites, landing pages e identidades visuais com capricho no visual e foco em resultado.",
  keywords: [
    "designer gráfico",
    "UI/UX designer",
    "web designer",
    "landing page",
    "identidade visual",
    "branding",
    "designer de sites",
    "portfólio designer",
    "Danilo Aguillar",
  ],
  authors: [{ name: "Danilo Aguillar", url: BASE_URL }],
  creator: "Danilo Aguillar",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    title: "Danilo Aguillar | Designer de UI/UX e Identidade Visual",
    description: "Design que resolve. Sites que ficam na memória.",
    url: BASE_URL,
    siteName: "Danilo Aguillar",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/juliana-goes.webp",
        width: 1200,
        height: 630,
        alt: "Danilo Aguillar | Designer de UI/UX e Identidade Visual",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Danilo Aguillar | Designer de UI/UX e Identidade Visual",
    description: "Design que resolve. Sites que ficam na memória.",
    images: ["/juliana-goes.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Host+Grotesk:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Danilo Aguillar",
              jobTitle: "Designer de UI/UX e Identidade Visual",
              description:
                "Designer gráfico e de interfaces. Crio sites, landing pages e identidades visuais com capricho no visual e foco em resultado.",
              url: "https://www.daniloaguillar.com.br",
              image: "https://www.daniloaguillar.com.br/danilo.webp",
              knowsAbout: [
                "UI/UX Design",
                "Branding",
                "Web Design",
                "Identidade Visual",
                "Landing Page",
                "Design Gráfico",
              ],
              hasOccupation: {
                "@type": "Occupation",
                name: "Designer Gráfico e UI/UX",
                occupationLocation: { "@type": "Country", name: "Brasil" },
              },
              mainEntityOfPage: {
                "@type": "WebSite",
                "@id": "https://www.daniloaguillar.com.br",
                name: "Portfólio de Danilo Aguillar",
                url: "https://www.daniloaguillar.com.br",
              },
            }),
          }}
        />
      </head>
      <body className={`${playfair.variable} antialiased`}>
        <ClientLayout>{children}</ClientLayout>

        {/* Google Analytics 4 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-6R96LBQMPW"
          strategy="afterInteractive"
        />
        <Script id="ga4" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-6R96LBQMPW');
          `}
        </Script>

        {/* Microsoft Clarity */}
        <Script id="clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "x8k1croj34");
          `}
        </Script>
      </body>
    </html>
  );
}
