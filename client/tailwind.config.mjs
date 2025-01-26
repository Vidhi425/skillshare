/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      boxShadow: {
        custom: ' 20px -20px 60px  #c7c7c7, inset -20px 20px 60px #f9f9f9',
      },
      backgroundImage: {
        'gradient-custom': 'linear-gradient(45deg, #f0f0f0, #cacaca)',
      },
    },
  },
  plugins: [],
};

