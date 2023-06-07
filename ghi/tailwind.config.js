/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      borderSpacing: {
        13: "3.25rem",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
