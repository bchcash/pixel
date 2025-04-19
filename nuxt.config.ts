// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // 📦 Модули проекта (должны быть строго перед devtools!)
  modules: [
    '@nuxthub/core',
    '@nuxt/ui',
    '@nuxt/eslint',
    'nuxt-auth-utils',
    '@nuxtjs/color-mode',
  ],

  // 🛠 Devtools
  devtools: {
    enabled: false,
  },

  // 📁 Глобальные стили
  css: ['~/assets/main.css'],

  // 🎨 Настройка темы
  colorMode: {
    preference: 'light',
    fallback: 'light',
    classSuffix: '',
  },

  // ⚙️ Настройки совместимости
  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: '2024-07-30',

  // 📡 Конфигурация hub
  hub: {
    ai: false,
    blob: true,
  },

  // ✅ ESLint настройки
  eslint: {
    config: {
      stylistic: {
        // ✅ Здесь ты правильно заметил: значение должно быть строго 'single', 'double' или 'backtick'
        quotes: 'single',
      },
    },
  },
})
