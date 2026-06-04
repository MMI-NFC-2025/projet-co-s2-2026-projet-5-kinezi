/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'kinezi-violet': '#8C17F8',
        'kinezi-bleu': '#060F58',
        'kinezi-fond': '#F9FAFB',
      },
      fontFamily: {
        spartan: ['League Spartan', 'sans-serif'],
        nunito: ['Nunito', 'sans-serif'],
      }
    },
  },
  plugins: [],
}