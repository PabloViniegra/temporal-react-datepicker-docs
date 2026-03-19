// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

import react from '@astrojs/react';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://PabloViniegra.github.io/temporal-react-datepicker-docs',
  base: '/temporal-react-datepicker-docs',
  integrations: [starlight({
      title: 'temporal-react-datepicker',
      social: [
          {
              icon: 'github',
              label: 'GitHub',
              href: 'https://github.com/PabloViniegra/temporal-react-datepicker-docs',
          },
          {
              icon: 'external',
              label: 'npm',
              href: 'https://www.npmjs.com/package/temporal-react-datepicker',
          },
      ],
      customCss: ['./src/styles/global.css', './src/styles/custom.css'],
      head: [
          {
              tag: 'link',
              attrs: {
                  rel: 'preconnect',
                  href: 'https://fonts.googleapis.com',
              },
          },
          {
              tag: 'link',
              attrs: {
                  rel: 'preconnect',
                  href: 'https://fonts.gstatic.com',
                  crossorigin: true,
              },
          },
          {
              tag: 'link',
              attrs: {
                  rel: 'stylesheet',
                  href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,400;0,14..32,500;0,14..32,600;0,14..32,700;0,14..32,800&family=JetBrains+Mono:wght@400;500&display=swap',
              },
          },
      ],
      sidebar: [
          {
              label: 'Guides',
              items: [
                  { label: 'Getting Started', slug: 'guides/getting-started' },
                  { label: 'Date Range', slug: 'guides/date-range' },
                  { label: 'Disabled Dates', slug: 'guides/disabled-dates' },
                  { label: 'Custom Day Content', slug: 'guides/custom-day-content' },
                  { label: 'Internationalization', slug: 'guides/i18n' },
                  { label: 'Theming', slug: 'guides/theming' },
              ],
          },
          {
              label: 'Reference',
              autogenerate: { directory: 'reference' },
          },
          {
              label: 'Playground',
              items: [
                  { label: 'Interactive Playground', slug: 'playground' },
              ],
          },
      ],
      }), react()],

  vite: {
    plugins: [tailwindcss()],
  },
});