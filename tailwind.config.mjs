import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        paper: '#FAF9F6',
        surface: '#FFFFFF',
        ink: {
          DEFAULT: '#111827',
          muted: '#4B5563',
          subtle: '#6B7280',
        },
        accent: {
          DEFAULT: '#1E3A8A',
          light: '#EFF6FF',
          border: '#BFDBFE',
          hover: '#172554',
        },
        border: {
          DEFAULT: '#E5E7EB',
          subtle: '#F3F4F6',
        }
      },
      fontFamily: {
        serif: ['"Newsreader"', 'Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
        sans: ['"Plus Jakarta Sans"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
    },
  },
  plugins: [typography],
};
