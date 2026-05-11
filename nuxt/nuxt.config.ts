// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  app: { head: { htmlAttrs: { lang: 'en' } } },
  routeRules: {
    '/computers': { ssr: true },
    '/computers/**': { ssr: true },
    '/blog': { ssr: true },
    '/blog/**': { ssr: true },
    '/tools': { ssr: false },
    '/tools/**': { ssr: false },
  },
});
