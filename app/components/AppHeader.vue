<script setup>
const { loggedIn, clear } = useUserSession()
</script>

<template>
  <header class="border-b border-(--ui-border) -mb-px sticky top-0 z-50 border-none md:pt-8 md:max-w-2xl mx-auto bg-transparent backdrop-blur-none">
    <UContainer class="flex items-center justify-between gap-3 h-16 md:rounded-full border-b md:border border-(--ui-border-muted) bg-(--ui-bg-muted)">
      <NuxtLink
        to="/"
        class="flex items-center gap-1 flex-shrink-0 font-bold text-xl"
      >
        <UIcon name="emojione-monotone:frog-face" />
        <h3>Pepu NFT Hub</h3>
      </NuxtLink>
      <div class="flex items-center justify-end lg:flex-1 gap-1.5">
        <UButton
          to="/draw"
          icon="i-ph-pencil"
        >
          Create NFT
        </UButton>
        <UButton
          v-if="loggedIn"
          color="neutral"
          variant="subtle"
          icon="i-ph-power"
          @click="clear"
        />
      </div>
    </UContainer>
  </header>


</template>
