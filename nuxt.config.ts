export default defineNuxtConfig({
  compatibilityDate: '2026-01-01',

  future: {
    compatibilityVersion: 4,
  },

  devtools: { enabled: false },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@nuxt/icon',
    '@nuxt/fonts',
  ],

  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: 'tailwind.config.ts',
    viewer: false,
  },

  colorMode: {
    classSuffix: '',
    preference: 'dark',
    fallback: 'dark',
    storageKey: 'gp-portfolio-theme',
  },

  icon: {
    serverBundle: {
      collections: ['lucide', 'simple-icons'],
    },
  },

  fonts: {
    defaults: {
      weights: [400, 500, 600, 700],
      styles: ['normal'],
    },
    families: [
      { name: 'Plus Jakarta Sans', provider: 'google' },
      { name: 'JetBrains Mono', provider: 'google' },
    ],
  },

  runtimeConfig: {
    githubToken: process.env.NUXT_GITHUB_TOKEN || '',
    public: {
      githubUsername: process.env.NUXT_PUBLIC_GITHUB_USERNAME || 'gabrielpelizzari',
    },
  },

  app: {
    head: {
      htmlAttrs: {
        lang: 'pt-BR',
      },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Gabriel Pelizzari — Software Developer',
      meta: [
        {
          name: 'description',
          content:
            'Portfólio de Gabriel Pelizzari — Desenvolvedor de Software Fullstack especializado em arquiteturas orientadas a eventos, APIs em Python/FastAPI e interfaces modernas em Vue & Nuxt.',
        },
        { name: 'theme-color', content: '#09090b' },
      ],
      link: [
        {
          rel: 'icon',
          type: 'image/svg+xml',
          href: '/favicon.svg',
        },
      ],
    },
  },
})
