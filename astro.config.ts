import vue from '@astrojs/vue';
import tutorialkit from '@tutorialkit/astro';
import { pluginFileIcons } from '@xt0rted/expressive-code-file-icons';
import { defineConfig } from 'astro/config';
export default defineConfig({
  devToolbar: {
    enabled: false,
  },
  markdown: {
    rehypePlugins: [
      [
        'rehype-external-links',
        { target: '_blank', rel: ['noopener', 'noreferrer'] },
      ],
    ],
  },
  integrations: [
    vue({
      devtools: true,
      appEntrypoint: '/src/pages/_app',
    }),

    tutorialkit({
      components: {
        TopBar: './src/components/TopBar.astro',
      },
      expressiveCodeThemes: ['snazzy-light', 'vesper'],
      expressiveCodePlugins: [
        // @ts-ignore
        pluginFileIcons({
          iconClass: 'av-icon',
          titleClass: 'av-title',
        }),
      ],
    }),
  ],
});
