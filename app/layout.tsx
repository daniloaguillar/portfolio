import type { Metadata } from "next";
import { Fraunces } from "next/font/google";
import "./globals.css";

const playfair = Fraunces({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Danilo Aguillar — Designer UI/UX",
  description:
    "Portfólio de Danilo Aguillar, designer gráfico e UI/UX especializado em criar sites que unem beleza e função.",
  keywords: ["designer", "UI/UX", "sites", "portfólio", "web design", "Danilo Aguillar"],
  authors: [{ name: "Danilo Aguillar" }],
  openGraph: {
    title: "Danilo Aguillar — Designer UI/UX",
    description: "Design que resolve. Sites que ficam na memória.",
    url: "https://daniloaguillar.com.br",
    siteName: "Danilo Aguillar",
    locale: "pt_BR",
    type: "website",
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
      </head>
      <body className={`${playfair.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
