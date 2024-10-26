// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/supabase',
    '@pinia/nuxt'
  ],
  runtimeConfig: {
    STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    STRIPE_WEBHOOK_KEY: process.env.STRIPE_WEBHOOK_KEY,
    public: {
      BASE_URL: process.env.BASE_URL,
    },
  },
  app: {
    head: {
      script: [
        {
          async: true,
          id: "vtag-ai-js",
          src: "https://r2.leadsy.ai/tag.js",
          'data-pid': "1BkuQzldPanZAl2qF",
          'data-version': "062024"
        },
        {
          async: false,
          src: "https://cdn.getphyllo.com/connect/v2/phyllo-connect.js"
        }
      ],
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Figtree:ital,wght@0,300..900;1,300..900&display=swap'
        },
      ]
    }
  },
});