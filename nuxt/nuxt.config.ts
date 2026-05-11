import { articles } from './shared/data/article.data';

const blogPrerenderRoutes = ['/blog', ...articles.map((article) => `/blog/${article.slug}`)];

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  nitro: {
    preset: 'node-server',
    prerender: {
      routes: blogPrerenderRoutes,
    },
  },
  app: { head: { htmlAttrs: { lang: 'en' } } },
  routeRules: {
    '/computers': { ssr: true },
    '/computers/**': { ssr: true },
    '/blog': { prerender: true },
    '/blog/**': { prerender: true },
    '/tools': { ssr: false },
    '/tools/**': { ssr: false },
  },
});
