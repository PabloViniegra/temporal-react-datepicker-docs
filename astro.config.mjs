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
      favicon: '/favicon.svg',
      head: [
          {
              // Force dark theme as default on first visit (before Starlight's ThemeProvider runs)
              tag: 'script',
              attrs: { 'is:inline': true },
              content: `(function(){if(!localStorage.getItem('starlight-theme')){localStorage.setItem('starlight-theme','dark');document.documentElement.dataset.theme='dark';}})();`,
          },
      ],
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
      sidebar: [
          {
              label: 'Guides',
              items: [
                  { label: 'Getting Started', slug: 'guides/getting-started' },
                  { label: 'DatePickerInput', slug: 'guides/datepicker-input' },
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