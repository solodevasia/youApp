import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/shared/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        info: "rgba(255, 255, 255, 0.52)",
        input: "rgba(255, 255, 255, 0.3)",
        label: "rgba(255, 255, 255, 0.33)",
      },
      backgroundColor: {
        background: "rgba(22, 35, 41, 1)",
        box: "rgba(14, 25, 31, 1)",
        imageBackground: "rgba(255, 255, 255, 0.08)",
        input: "rgba(217, 217, 217, 0.06)",
      },
      borderColor: {
        input: "rgba(255, 255, 255, 0.22)",
      },
    },
  },
  plugins: [],
} satisfies Config;
