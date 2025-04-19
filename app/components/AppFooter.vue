<script setup>
const colorMode = useColorMode()

// Computed
const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set() {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  },
})
</script>

<template>
  <footer>
    <UContainer class="py-8 lg:py-4 lg:flex lg:items-center lg:justify-between lg:gap-x-3">
      <div class="lg:flex-1 flex items-center justify-center lg:justify-end gap-x-1.5 lg:order-3">
        <ClientOnly v-if="!colorMode?.forced">
          <UButton
            :icon="isDark ? 'i-lucide-moon' : 'i-lucide-sun'"
            :aria-label="`Switch to ${isDark ? 'light' : 'dark'} mode`"
            color="neutral"
            variant="ghost"
            @click="isDark = !isDark"
          />

          <template #fallback>
            <div class="w-8 h-8" />
          </template>
        </ClientOnly>
        <UButton
          to="https://github.com/nuxt/nuxt/graphs/contributors"
          color="neutral"
          variant="ghost"
          icon="i-simple-icons-github"
        />
        <UButton
          to="https://x.com/pepu_nft"
          color="neutral"
          variant="ghost"
          icon="i-simple-icons-x"
        />
        <UButton
          to="https://t.me/nft_pepu"
          color="neutral"
          variant="ghost"
          icon="hugeicons:telegram"
        />
      </div>
      <div class="flex items-center justify-center lg:justify-start lg:flex-1 gap-x-1.5 mt-3 lg:mt-0 lg:order-1 text-center lg:text-left">
        <span class="text-sm">CA :<ULink
          to="https://pepuscan.com/token/0xecd2bafeb49acc6c6c820dbb537946988b67ebd3"
          class="font-medium hover:underline underline-offset-3"
        >
          0xecd2bafeb49acc6c6c820dbb537946988b67ebd3
        </ULink></span>
      </div>
    </UContainer>
  </footer>
</template>
