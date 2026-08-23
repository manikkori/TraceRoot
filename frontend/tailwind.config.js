/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        neuBg: "#e0e5ec",
        neuText: "#4a5568",
        neuAccent: "#3b82f6",
      },
      boxShadow: {
        "neu-flat":
          "9px 9px 16px rgba(163,177,198,0.6), -9px -9px 16px rgba(255,255,255, 0.5)",
        "neu-pressed":
          "inset 6px 6px 10px 0 rgba(163,177,198, 0.7), inset -6px -6px 10px 0 rgba(255,255,255, 0.5)",
        "neu-pop":
          "4px 4px 8px rgba(163,177,198,0.5), -4px -4px 8px rgba(255,255,255, 0.8)",
      },
    },
  },
  plugins: [],
};
