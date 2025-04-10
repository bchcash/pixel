import { defineNuxtConfig } from 'nuxt'

export default defineNuxtConfig({
  // Модули
  modules: [
    '@nuxthub/core',
    '@nuxt/ui',
    '@nuxt/eslint',
    'nuxt-auth-utils',
  ],

  // Включаем инструменты разработчика
  devtools: { enabled: true },

  // Стили CSS
  css: ['~/assets/main.css'],

  // Настройки совместимости с более старыми версиями
  future: { compatibilityVersion: 4 },

  // Дата совместимости для Nuxt Nitro
  compatibilityDate: '2024-07-30',

  // Настройки для Hub
  hub: {
    ai: false,
    blob: true,
  },

  // Конфигурация для eslint
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
  },

  // Включение режима разработки Cloudflare
  buildModules: ['@nuxtjs/cloudflare-workers'], // Если вы используете cloudflare-workers для деплоя (по желанию)
})
