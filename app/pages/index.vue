<script setup lang="ts">
import type { BlobObject } from '@nuxthub/core'
import { UseTimeAgo, vInfiniteScroll } from '@vueuse/components'
import { UAvatar } from '#components'

const { data } = await useFetch('/api/drawings', {
  deep: true,
})

const loading = ref(false)

async function loadMore() {
  if (loading.value || !data.value?.hasMore) return
  loading.value = true

  const more = await $fetch(`/api/drawings`, {
    query: { cursor: data.value.cursor },
  })

  data.value.blobs.push(...more.blobs)
  data.value.cursor = more.cursor
  data.value.hasMore = more.hasMore
  loading.value = false
}

function drawingTitle(drawing: BlobObject) {
  const title = drawing.customMetadata?.description || ''
  return title || drawing.pathname
}

function shortenAddress(address: string) {
  return address.slice(0, 4) + '...' + address.slice(-4)
}
</script>

<template>
  <div class="my-8">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      <div
        v-for="drawing in data?.blobs"
        :key="drawing.pathname"
        class="flex flex-col gap-2"
      >
        <div class="relative max-w-[400px]">
          <img
            :src="`/drawings/${drawing.pathname}`"
            :alt="drawingTitle(drawing)"
            :title="drawingTitle(drawing)"
            class="w-full rounded aspect-1"
            loading="lazy"
          />
          <!-- Badge with description -->
          <div
            v-if="drawing.customMetadata?.description"
            class="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-cyan-100 text-sky-400 text-xs font-semibold px-3 py-1 rounded-full"
          >
            {{ drawing.customMetadata.description }}
          </div>
        </div>
        <div class="flex items-center justify-between max-w-[400px]">
          <NuxtLink
            class="flex items-center gap-1"
            :to="`https://pepuscan.com/address/${drawing.customMetadata?.walletAddress}`"
            target="_blank"
          >
            <UAvatar
              icon="i-ph-wallet-duotone"
              size="xs"
            />
            <span class="text-xs font-semibold">
              {{ shortenAddress(drawing.customMetadata?.walletAddress || '0x0000') }}
            </span>
          </NuxtLink>
          <UseTimeAgo
            v-slot="{ timeAgo }"
            :time="new Date(drawing.customMetadata?.uploadedAt || drawing.uploadedAt)"
          >
            <span class="text-xs text-(--ui-text-muted)">{{ timeAgo }}</span>
          </UseTimeAgo>
        </div>
      </div>
    </div>

    <div
      v-if="data?.hasMore"
      v-infinite-scroll="[loadMore, { distance: 10, interval: 1000 }]"
      class="flex items-center justify-center mt-2 p-4"
    >
      <UButton
        color="neutral"
        variant="subtle"
        block
        size="md"
        :loading="loading"
        :label="loading ? 'Loading more drawings...' : 'Load more drawings'"
        @click="loadMore"
      />
    </div>
  </div>
</template>
