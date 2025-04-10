<script setup lang="ts">
useSeoMeta({
  title: 'Create and Share Your PEPU Style NFT with Atidraw',
  description: 'Atidraw is a web application where you can create, customize, and share your unique PEPU Style NFTs with the world. Powered by Cloudflare R2 and Cloudflare AI to bring your art to life.',
  ogTitle: 'Atidraw - PEPU Style NFT Creator',
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
</script>

<template>
  <UApp>
    <AppHeader />
    <UContainer>
      <main class="min-h-[calc(100vh-192px)]">
        <NuxtPage />
      </main>
    </UContainer>
    <AppFooter />
  </UApp>
</template>
