import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import redirectsPlugin from './redirects.config';

const config: Config = {
  title: 'JHipster',
  // tagline: 'Dinosaurs are cool',
  favicon: 'images/favicon.ico',

  // Set the production url of your site here
  url: 'https://www.jhipster.tech',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  deploymentBranch: 'gh-pages',
  organizationName: 'jhipster',
  projectName: 'jhipster.github.io',

  // onBrokenLinks: 'throw',
  onBrokenLinks: 'ignore',
  // onBrokenMarkdownLinks: 'warn',
  onBrokenMarkdownLinks: 'ignore',
  onBrokenAnchors: 'ignore',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Remove this to remove the "edit this page" links.
          editUrl: 'https://github.com/jhipster/jhipster.github.io/tree/main/',
          routeBasePath: '/',
          showLastUpdateTime: true,
        },
        blog: false,
        // blog: {
        //   showReadingTime: true,
        //   // Please change this to your repo.
        //   // Remove this to remove the "edit this page" links.
        //   editUrl:
        //     'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        // },
        theme: {
          customCss: './src/scss/custom.scss',
        },
        sitemap: {
          changefreq: 'daily',
          lastmod: 'datetime',
          ignorePatterns: ['/modules/marketplace/details/\\*', '/search'],
        },
        // IMPORTANT: uncomment for jhipster.github.io in production
        // gtag: {
        //   trackingID: 'G-4L9RJVPGJT',
        //   anonymizeIP: true
        // },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    'docusaurus-plugin-sass',
    redirectsPlugin,
    './src/plugins/google-fonts.ts',
    './src/plugins/module-details.ts',
  ],

  themeConfig: {
    metadata: [
      { name: 'author', content: 'JHipster Team' },
      { name: 'twitter:site', content: '@jhipster' },
      {
        name: 'google-site-verification',
        content: 'JSA7VC5gSwD5KKbXlxK8F9rXJtC91rKJq0aWhfpBC0k',
      },
    ],
    image: 'images/twitter-card.png',
    navbar: {
      logo: {
        alt: 'JHipster Logo',
        src: 'images/logo/logo-light.svg',
        srcDark: 'images/logo/logo-dark.svg',
        width: 140,
        height: 32,
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'right',
          label: 'Docs',
        },
        {
          to: '/modules/marketplace/',
          label: 'Marketplace',
          position: 'right',
        },
        {
          to: '/team/',
          label: 'Team',
          position: 'right',
        },
        {
          to: '/sponsors/',
          label: 'Sponsors',
          position: 'right',
        },
        {
          href: 'https://start.jhipster.tech/jdl-studio/',
          label: 'JDL Studio',
          position: 'right',
        },
      ],
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['java', 'bash', 'yaml', 'gradle', 'diff'],
    },
    algolia: {
      appId: 'BH4D9OD16A',
      apiKey: '9bd47d3de4af6f3662fd11a7f0e38819',
      indexName: 'jhipster',
      // Temporary disabled, need setup https://docusaurus.io/docs/search#algolia-troubleshooting
      contextualSearch: false,
    },
  } satisfies Preset.ThemeConfig,

  headTags: [
    // JSON+LD
    {
      tagName: 'script',
      attributes: {
        type: 'application/ld+json',
      },
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org/',
        '@type': 'Organization',
        name: 'JHipster',
        url: 'https://www.jhipster.tech',
        logo: 'https://www.jhipster.tech/images/logo/logo.svg',
        sameAs: [
          'https://x.com/jhipster',
          'https://github.com/jhipster/generator-jhipster',
        ],
      }),
    },
  ],
};

export default config;
