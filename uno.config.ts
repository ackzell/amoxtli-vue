import { defineConfig } from '@tutorialkit/theme';
import presetWebFonts from '@unocss/preset-web-fonts';

export default defineConfig({
  // add your UnoCSS config here: https://unocss.dev/guide/config-file
  presets: [
    presetWebFonts({
      fonts: {
        sans: 'Work+Sans:400,500,600,700',
      },
    }),
  ],
  rules: [
    [
      'test-rule',
      {
        'background-color': 'lime !important',
        color: 'black !important',
      },
    ],
  ],
});
