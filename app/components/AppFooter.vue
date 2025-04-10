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
          to="https://git.new/draw"
          color="neutral"
          variant="ghost"
          icon="i-simple-icons-github"
        />
        <UButton
          to="https://x.com/atinux"
          color="neutral"
          variant="ghost"
          icon="i-simple-icons-x"
        />
        <UButton
          to="https://t.me/pepu_artlab"
          color="neutral"
          variant="ghost"
          icon="hugeicons:telegram"
        />
      </div>
      <div class="flex items-center justify-center lg:justify-start lg:flex-1 gap-x-1.5 mt-3 lg:mt-0 lg:order-1 text-center lg:text-left">
        <span class="text-sm">CA :<ULink
          to="https://www.geckoterminal.com/pepe-unchained/pools/0xdcd692d5422dba5c653b82da6c5dcb4006a4ceab"
          class="font-medium hover:underline underline-offset-3"
        >
          0x0afb32dc4cc0595654dc71a61a3132b3d90538f9
        </ULink></span>
      </div>
    </UContainer>
  </footer>
</template>
