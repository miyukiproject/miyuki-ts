/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        lato: ['Lato', 'sans-serif'],
      },
      colors: {
        "mumuki-skyblue": "#3498DB",
        "mumuki-rose": "#ff5b81",
        "mumuki-teal": "#0B465D",
        "mumuki-sky": "#CCE5F6",
        "mumuki-rose-darken": "#d94d6e"
        ,
        /* Progress colors mapped to CSS variables so themes can override them */
        "progress-passed": "var(--progress-passed)",
        "progress-pending": "var(--progress-pending)",
        "progress-failed": "var(--progress-failed)",
        "progress-error": "var(--progress-error)",
        "progress-processing": "var(--progress-processing)",
        "progress-active-dot": "var(--progress-active-dot)",
      }
    },
  },
  plugins: [],
}
