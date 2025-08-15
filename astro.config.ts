import tutorialkit from '@tutorialkit/astro';
import { pluginFileIcons } from '@xt0rted/expressive-code-file-icons';
import { defineConfig } from 'astro/config';

export default defineConfig({
  devToolbar: {
    enabled: false,
  },
  integrations: [tutorialkit({
    // @ts-ignore
    expressiveCodePlugins: [pluginFileIcons({
      iconClass: 'av-icon',
      titleClass: 'av-title',
    })],
  })],
});
