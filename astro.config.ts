import vue from '@astrojs/vue';
import tutorialkit from '@tutorialkit/astro';
import { pluginFileIcons } from '@xt0rted/expressive-code-file-icons';
import { defineConfig } from 'astro/config';
import ecTwoSlash from "expressive-code-twoslash";
import { h } from 'hastscript';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeSlug from 'rehype-slug';

export default defineConfig({
  devToolbar: {
    enabled: false,
  },
  markdown: {
    rehypePlugins: [
      [
        rehypeExternalLinks,
        { target: '_blank', rel: ['noopener', 'noreferrer'] },
      ],
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'append',
          content: [
            h(
              'svg',
              {
                width: 16,
                height: 16,
                viewBox: '0 0 16 16',
                ariaHidden: 'true',
                style:
                  'display: inline-block; vertical-align: middle; margin-left: 0.25rem;',
              },
              [
                h('path', {
                  fill: 'currentColor',
                  d: 'M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z',
                }),
              ]
            ),
          ],
        },
      ],
    ],
  },
  integrations: [
    vue({
      // devtools: true,
      appEntrypoint: '/src/pages/_app',
    }),

    tutorialkit({
      components: {
        TopBar: './src/components/TopBar.astro',
      },
      expressiveCodeThemes: ['snazzy-light', 'vesper'],
      expressiveCodePlugins: [
        // Debug plugin - add this FIRST
        // {
        //   name: 'debug-logger',
        //   hooks: {
        //     preprocessCode: ({ codeBlock }) => {
        //       console.error('🔍 CODE BLOCK DETECTED - Language:', codeBlock.language, '| Meta:', codeBlock.meta);
        //     }
        //   }
        // },
        // @ts-ignore
        pluginFileIcons({
          iconClass: 'av-icon',
          titleClass: 'av-title',
        }),
        ecTwoSlash(),
      ],
      expressiveCodeStyleOverrides: {
        textMarkers: {
          markHue({ theme }) {
            return theme.type == 'dark' ? '359.59' : '69.68';
          },
          defaultChroma({ theme }) {
            return theme.type == 'dark' ? '77.59' : '63.4';
          },
          defaultLuminance({ theme }) {
            return theme.type == 'dark' ? '50.08' : '73.06'
          },
          backgroundOpacity: '15%'
        },
        collapsibleSections: {
          closedBackgroundColor: 'var(--av-ec-collapsibleSections-closedBackgroundColor)',
          closedTextColor: 'var(--av-ec-collapsibleSections-closedTextColor)',
          openBackgroundColorCollapsible: 'var(--av-ec-collapsibleSections-openBackgroundColorCollapsible)'
        },
        frames: {
          tooltipSuccessBackground: 'var(--tk-text-positive)',
          tooltipSuccessForeground({ theme }) {
            return theme.type == 'light' ? 'whitesmoke' : 'black'
          }
        },
        twoSlash: {
          cursorColor: ({ theme }) => (theme.type === 'dark' ? '#ffffff' : '#000000'),
          borderColor: ({ theme }) => (theme.type === 'dark' ? '#464646ff' : '#cccccc'),
        },
      }
    }),
  ],
});
