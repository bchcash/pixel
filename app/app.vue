<script setup lang="ts">
import { useRoute } from 'vue-router'

useSeoMeta({
  title: 'Create and Share Your PEPU NFT with PIXEL',
  description: 'Unleash your creativity – forge unique PEPU NFTs and captivate the world.',
  ogTitle: 'PIXEL - PEPU NFT Creator',
  ogImage: '',
  twitterCard: 'summary_large_image',
})

if (import.meta.server) {
  useHead({
    meta: [
      { name: 'google-site-verification', content: '' },
    ],
  })
}

const route = useRoute()
</script>

<template>
  <UApp>
    <!-- Верхняя градиентная полоска -->
    <div class="color-banner"></div>

    <!-- Шапка для /wall -->
    <AppHeader v-if="route.path === '/wall'" />

    <UContainer>
      <main class="min-h-[calc(100vh-192px)]">
        <NuxtPage />
      </main>
    </UContainer>

    <!-- Футер для /wall -->
    <AppFooter v-if="route.path === '/wall'" />
  </UApp>
</template>

<style scoped>
.color-banner {
  height: 5px;
  background: linear-gradient(270deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3);
  background-size: 1400% 1400%;
  animation: gradientAnimation 30s ease infinite;
}

@keyframes gradientAnimation {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
</style>
