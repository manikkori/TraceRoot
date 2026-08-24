/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        devBg: "#09090b", // Deep Black/Zinc for background
        devCard: "#18181b", // Slightly lighter dark for cards
        devBorder: "#27272a", // Subtle border color
        devText: "#f4f4f5", // Clean white text
        devMuted: "#a1a1aa", // Gray text for secondary info
        devAccent: "#3b82f6", // Bright Blue for buttons/links
      },
      backgroundImage: {
        "grid-pattern":
          "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0V0zm1 1h38v38H1V1z' fill='%2327272a' fill-opacity='0.2' fill-rule='evenodd'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
};
