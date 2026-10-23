module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: { navy: "#0a0f1d", cyan: { neon: "#00f0ff" }, volt: "#7c5cff" },
      fontFamily: { sans: ["var(--font-inter)", "system-ui", "sans-serif"], mono: ["var(--font-mono)", "monospace"] },
      boxShadow: { glow: "0 0 24px rgba(0,240,255,.45)" },
    },
  },
  plugins: [],
};
