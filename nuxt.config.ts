// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
    '@nuxtjs/color-mode',
    '@nuxtjs/google-fonts',
    '@nuxt/image',
    '@nuxtjs/supabase',
    '@pinia/nuxt',
    "@nuxt/fonts"
  ],
  googleFonts: {
    families: {
      'Bricolage+Grotesque': true
    }
  },
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: 'tailwind.config',
    exposeConfig: true,
    config: {},
    injectPosition: 'first',
    viewer: true,
  },
  shadcn: {
    prefix: '',
    componentDir: './components/ui'
  },
  colorMode: {
    classSuffix: ''
  },
  supabase: {
    redirectOptions: {
      login: '/login',
      callback: '/',
      exclude: ['/register']
    }
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' }
  },
  fonts: {
    families: [
      {
        name: 'Square Sans Display',
        provider: 'custom',
        src: 'url("https://square-fonts-production-f.squarecdn.com/square-display/SquareSansDisplay-VF.woff2")',
        weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
        styles: ['normal'],
      },
      {
        name: 'Square Sans Text Italic',
        provider: 'custom',
        src: 'url("https://square-fonts-production-f.squarecdn.com/square-text/SquareSansText-Italic-VF.woff2")',
        weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
        styles: ['italic'],
      },
      {
        name: 'Square Sans Text Medium',
        provider: 'custom',
        src: 'url("https://square-fonts-production-f.squarecdn.com/square-text/SquareSansText-Medium.woff2")',
        weights: [500],
        styles: ['normal'],
      },
      {
        name: 'Square Sans Text Upright',
        provider: 'custom',
        src: 'url("https://square-fonts-production-f.squarecdn.com/square-text/SquareSansText-Upright-VF.woff2")',
        weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
        styles: ['normal'],
      },
    ],
    defaults: {
      weights: [400, 500, 700, 900],
      styles: ['normal', 'italic'],
      subsets: [],
    },
  }
})