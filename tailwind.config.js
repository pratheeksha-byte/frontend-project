/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          brand: {
            page: "#020817",
            modal: "#020C1B",
            input: "#0F172A",
            border: "#F97316",
            secondary: "#94A3B8",
            primary: "#FF6A00",
          }
        }
      },
    },
    plugins: [],
  }