import { defineConfig } from '@tutorialkit/theme';
import presetWebFonts from '@unocss/preset-web-fonts';

export default defineConfig({
  // add your UnoCSS config here: https://unocss.dev/guide/config-file
  presets: [
    presetWebFonts({
      fonts: {
        sans: 'Work Sans:400,500,600,700',
        mono: 'Space Mono:400,500,600,700',
      },
    }),
  ],
  theme: {
    colors: {
      bgr: 'hsl(30, 10%, 8%)',
      'primary-text': 'hsl(210, 29%, 80%)',
    },
  },
  shortcuts: {
    h1: 'text-3xl font-bold font-mono text-primary-text',
    'sign-in-btn': `px-4 py-2 font-sans
      bg-black text-light rounded
      hover:bg-dark-400 transition-bg duration-200
      shadow-md hover:shadow-lg`,
  },
});
