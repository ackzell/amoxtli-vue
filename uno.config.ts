import { defineConfig } from '@tutorialkit/theme';
import { presetIcons, presetWebFonts } from 'unocss';

export default defineConfig({
  // add your UnoCSS config here: https://unocss.dev/guide/config-file
  presets: [
    presetWebFonts({
      fonts: {
        sans: 'Work Sans:400,500,600,700',
        mono: 'Space Mono:400,500,600,700',
      },
    }),
    presetIcons({
      collections: {
        carbon: () =>
          import('@iconify-json/carbon/icons.json').then((i) => i.default),
        mynaui: () =>
          import('@iconify-json/mynaui/icons.json').then((i) => i.default),
      },
    }),
  ],
  theme: {
    colors: {
      bgr: 'hsl(30, 10%, 8%)',
      // tailwind blue
      info: {
        DEFAULT: 'oklch(62.3% 0.214 259.815)',
        50: 'oklch(97% 0.014 254.604)',
        100: 'oklch(97% 0.014 254.604)',
        200: 'oklch(97% 0.014 254.604)',
        250: 'oklch(80.9% 0.105 251.813 / 50%)',
        300: 'oklch(80.9% 0.105 251.813)',
        400: 'oklch(70.7% 0.165 254.624)',
        500: 'oklch(62.3% 0.214 259.815)',
        600: 'oklch(54.6% 0.245 262.881)',
        700: 'oklch(48.8% 0.243 264.376)',
        800: 'oklch(42.4% 0.199 265.638)',
        900: 'oklch(37.9% 0.146 265.522)',
        950: 'oklch(28.2% 0.091 267.935)',
        // dark: 'oklch(0.1368 0.091 267.935)',
        dark: 'transparent',
      },
      // tailwind emerald
      positive: {
        DEFAULT: 'oklch(69.6% 0.17 162.48)',
        50: 'oklch(97.9% 0.021 166.113)',
        100: 'oklch(95% 0.052 163.051)',
        200: 'oklch(90.5% 0.093 164.15)',
        300: 'oklch(84.5% 0.143 164.978)',
        400: 'oklch(76.5% 0.177 163.223)',
        500: 'oklch(69.6% 0.17 162.48)',
        600: 'oklch(59.6% 0.145 163.225)',
        700: 'oklch(50.8% 0.118 165.612)',
        800: 'oklch(43.2% 0.095 166.913)',
        900: 'oklch(37.8% 0.077 168.94)',
        950: 'oklch(26.2% 0.051 172.552)',
      },
      // tailwind amber
      warning: {
        DEFAULT: 'oklch(76.9% 0.188 70.08)',
        50: 'oklch(98.7% 0.022 95.277)',
        100: 'oklch(96.2% 0.059 95.617)',
        200: 'oklch(92.4% 0.12 95.746)',
        300: 'oklch(87.9% 0.169 91.605)',
        400: 'oklch(82.8% 0.189 84.429)',
        500: 'oklch(76.9% 0.188 70.08)',
        600: 'oklch(66.6% 0.179 58.318)',
        700: 'oklch(55.5% 0.163 48.998)',
        800: 'oklch(47.3% 0.137 46.201)',
        900: 'oklch(41.4% 0.112 45.904)',
        950: 'oklch(27.9% 0.077 45.635)',
      },
      // tailwind red
      negative: {
        DEFAULT: 'oklch(63.7% 0.237 25.331)',
        50: 'oklch(97.1% 0.013 17.38)',
        100: 'oklch(93.6% 0.032 17.717)',
        200: 'oklch(88.5% 0.062 18.334)',
        300: 'oklch(80.8% 0.114 19.571)',
        400: 'oklch(70.4% 0.191 22.216)',
        500: 'oklch(63.7% 0.237 25.331)',
        600: 'oklch(57.7% 0.245 27.325)',
        700: 'oklch(50.5% 0.213 27.518)',
        800: 'oklch(44.4% 0.177 26.899)',
        900: 'oklch(39.6% 0.141 25.723)',
        950: 'oklch(25.8% 0.092 26.042)',
      },
    },
  },
  shortcuts: {
    h1: 'text-3xl font-bold font-mono text-[var(--tk-text-primary)]',
    'sign-in-btn': `px-4 py-2 font-sans
      bg-black text-light rounded
      hover:bg-dark-400 transition-bg duration-200
      shadow-md hover:shadow-lg`,
    'top-bar-button': `flex items-center 
      text-2xl text-tk-elements-topBar-iconButton-iconColor 
      hover:text-tk-elements-topBar-iconButton-iconColorHover 
      transition-theme 
      bg-tk-elements-topBar-iconButton-backgroundColor 
      hover:bg-tk-elements-topBar-iconButton-backgroundColorHover 
      p-1 rounded-md`,
  },
});
