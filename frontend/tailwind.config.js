/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      textColor: {
        'main': "#3d4348",
        'nav-color': "#313336"
      },
      colors: {
        'sec': "#388da8",
        'heading-color': "#3e5055",
        'sec-active': "#255d6f"
      },
      height: {
        '80vh': "80vh",
        '60vh': "60vh",
      }
    },
  },
  plugins: [],
}
