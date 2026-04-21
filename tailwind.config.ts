import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        black: "#F5F5F0",
        accent: "#e86869",
        offwhite: "#252525",
        nearblack: "#e8e8e3",
      },
      fontFamily: {
        display: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["'Host Grotesk'", "system-ui", "sans-serif"],
      },
      cursor: {
        custom: "none",
      },
    },
  },
  plugins: [],
};
export default config;
