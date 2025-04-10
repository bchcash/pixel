// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxthub/core',
    '@nuxt/ui',
    '@nuxt/eslint',
    'nuxt-auth-utils',
  ],
  devtools: { enabled: true },
  css: ['~/assets/main.css'],
  future: { compatibilityVersion: 4 },
  compatibilityDate: '2024-07-30',
  hub: {
    ai: false,
    blob: true,
  },
  // Development modules
  eslint: {
    config: {
      stylistic: {
        quotes: 'single',
      },
    },
  },
   // Настройки для Cloudflare Pages
   nitro: {
    preset: 'cloudflare-pages', // Это указывает, что проект будет развернут на Cloudflare Pages
    output: {
      dir: '.output/cloudflare', // Указывает на папку, в которую будет собираться проект для Cloudflare
    },
  }
})
