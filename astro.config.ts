import tutorialkit from '@tutorialkit/astro';
import { pluginFileIcons } from '@xt0rted/expressive-code-file-icons';
import { defineConfig } from 'astro/config';

export default defineConfig({
  devToolbar: {
    enabled: false,
  },
  integrations: [
    tutorialkit({
      themes: ['snazzy-light', 'vesper'],
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
