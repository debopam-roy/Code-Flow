/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#3b5164",
        secondary: "#526d82",
        contemporary: "#89a4b5",
        overlay: "#f3efe3",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
