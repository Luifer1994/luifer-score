import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', 'Helvetica Neue', 'Helvetica', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Arial', 'sans-serif'],
      },
      fontSize: {
        '10xl': '8rem',  // 128px
        '14xl': '10rem', // 160px
      },
      scale: {
        '250': '2.5',    // 250%
      },
      fontWeight: {
        'extrabold': '800',
      }
    },
  },
  plugins: [],
} satisfies Config;
