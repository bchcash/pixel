<script setup lang="ts">
import type { TabsItem } from "@nuxt/ui";
const roadmapItems = [
  {
    icon: "i-lucide-rocket",
    title: "Platform Launch",
    description:
      "PEPU Pixel Hub goes live with NFT creation and Hall of Fame features",
    status: "Live",
  },
  {
    icon: "i-lucide-sparkles",
    title: "Hall of Fame Update",
    description:
      "Real-time rarity rankings with dynamic metadata visualization",
    link: "/",
    status: "Implemented",
  },
  {
    icon: "i-lucide-shopping-cart",
    title: "NFT Marketplace",
    description: "Integration with NiceHash NFT trading platform",
    status: "In Development",
  },
  {
    icon: "i-lucide-arrow-down-up",
    title: "NFT Swap Protocol",
    description: "Decentralized exchange mechanism for PEPU NFTs",
    status: "Planned",
  },
];

const roadmapColors = [
  {
    bg: "bg-green-50/60",
    iconBg: "bg-green-100/50",
    badgeColor: "green",
  },
  {
    bg: "bg-emerald-50/60",
    iconBg: "bg-emerald-100/50",
    badgeColor: "emerald",
  },
  {
    bg: "bg-blue-50/60",
    iconBg: "bg-blue-100/50",
    badgeColor: "blue",
  },
  {
    bg: "bg-purple-50/60",
    iconBg: "bg-purple-100/50",
    badgeColor: "purple",
  },
];

const items: TabsItem[] = [
  { label: "Create NFT", icon: "i-lucide-brush" },
  { label: "RoadMap", icon: "i-lucide-map" },
  { label: "About", icon: "i-lucide-info" },
];

const toast = useToast();
const saving = ref(false);
const drawing = ref("");
const walletAddress = ref<string | null>(null);
const activeTab = ref("create");

function onDraw(dataURL: string) {
  drawing.value = dataURL;
}

async function connectWallet() {
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      walletAddress.value = accounts[0];
      toast.add({
        title: "Wallet Connected!",
        description: `Connected: ${shortAddress.value}`,
      });
    } catch (err) {
      console.error("User rejected connection");
    }
  } else {
    alert("Metamask is not installed.");
  }
}

const shortAddress = computed(() => {
  if (!walletAddress.value) return "";
  return `${walletAddress.value.slice(0, 4)}...${walletAddress.value.slice(
    -4
  )}`;
});

async function save(dataURL: string) {
  if (saving.value) return;
  if (!walletAddress.value) {
    alert("Connect your Metamask wallet first!");
    return;
  }

  saving.value = true;

  const blob = await fetch(dataURL).then((res) => res.blob());
  const form = new FormData();
  form.append(
    "drawing",
    new File([blob], `drawing.jpg`, { type: "image/jpeg" })
  );
  form.append("address", walletAddress.value);
  await $fetch("/api/upload", {
    method: "POST",
    body: form,
  })
    .then(() => {
      toast.add({
        title: "Drawing shared!",
        description: "Your drawing has been shared with the world.",
        color: "green",
      });
      navigateTo("/");
    })
    .catch((err) => {
      toast.add({
        title: "Could not share drawing",
        description: err.data?.message || err.message,
        color: "red",
      });
    });

  saving.value = false;
}
</script>

<template>
  <div class="flex justify-center px-4">
    <UTabs
      :items="items"
      class="w-full md:max-w-3xl mt-10 rounded-2xl bg-white/80 backdrop-blur-sm shadow-xs ring-1 ring-gray-200/30"
      :ui="{
        wrapper: 'p-2',
        list: {
          base: 'space-x-0',
          tab: {
            base: 'relative transition-all duration-200',
            inactive: 'text-gray-500 hover:bg-gray-50/50',
            active: 'bg-white shadow-sm ring-1 ring-gray-200/20 text-gray-900',
            icon: 'w-5 h-5 flex-shrink-0',
            label: 'text-[0.925rem] font-medium',
          },
        },
      }"
    >
      <!-- Tab Content: Create NFT -->
      <template #content="{ item }">
        <div
          v-if="item.label === 'Create NFT'"
          class="flex justify-center py-12 px-4"
        >
          <div
            class="w-full max-w-[480px] flex flex-col items-center text-center"
          >
            <div class="space-y-1 mb-8">
              <h2 class="text-2xl font-semibold tracking-tight text-gray-900">
                Pixel Creator Studio
              </h2>
              <p class="text-gray-600 text-[0.937rem]">
                Transform your artwork into blockchain marvels
              </p>
            </div>

            <div v-if="walletAddress" class="space-y-6 w-full">
              <div
                class="rounded-xl bg-gray-50 p-4 ring-1 ring-gray-200/20 flex justify-center"
              >
                <DrawPad
                  save-label="Mint NFT"
                  :saving="saving"
                  @save="save"
                  @draw="onDraw"
                />
              </div>
              <p class="text-center text-[0.8125rem] font-medium text-gray-500">
                Creator Wallet: {{ shortAddress }}
              </p>
            </div>

            <div v-else class="space-y-8 w-full">
              <div
                class="rounded-2xl p-6 bg-gray-50/50 ring-1 ring-gray-200/20"
              >
                <UButton
                  @click="connectWallet"
                  label="Connect Wallet"
                  color="primary"
                  size="xl"
                  icon="i-lucide-wallet"
                  :ui="{
                    base: 'font-medium tracking-tight transition-all',
                    color: {
                      primary:
                        'text-white bg-gray-900 hover:bg-gray-800 shadow-sm',
                    },
                  }"
                  class="hover:scale-[0.98] transform transition-transform"
                  block
                />
                <p class="mt-4 text-center text-[0.8125rem] text-gray-500">
                  Secured by Ethereum L2 Pepe Unchained
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Tab Content: RoadMap -->
        <div v-if="item.label === 'RoadMap'" class="py-8">
          <div class="max-w-2xl mx-auto space-y-4">
            <div
              v-for="(item, index) in roadmapItems"
              :key="index"
              :class="[
                'rounded-xl p-5 backdrop-blur-sm shadow-xs ring-1 ring-gray-200/20 transition-all hover:ring-gray-200/40 flex items-start gap-3',
                roadmapColors[index % roadmapColors.length].bg,
              ]"
            >
              <div
                class="p-3 rounded-lg ring-1 ring-gray-200/20 flex items-center justify-center"
                :class="roadmapColors[index % roadmapColors.length].iconBg"
              >
                <UIcon :name="item.icon" class="w-6 h-6 text-gray-700" />
              </div>
              <div class="flex-1">
                <h3 class="font-medium text-gray-900">{{ item.title }}</h3>
                <p class="mt-1 text-[0.875rem] text-gray-700 leading-5">
                  {{ item.description }}
                  <NuxtLink
                    v-if="item.link"
                    :to="item.link"
                    class="text-blue-500 hover:text-blue-600 inline-flex items-center gap-1"
                  >
                    Check now <span class="text-[0.875em]">↗</span>
                  </NuxtLink>
                </p>
                <div class="mt-3">
                  <UBadge
                    color="neutral"
                    variant="outline"
                    size="lg"
                    class="font-medium"
                  >
                    {{ item.status }}
                  </UBadge>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Tab Content: About -->
        <div v-if="item.label === 'About'" class="py-12">
          <UContainer
            class="flex flex-col items-center gap-6 px-4 md:max-w-2xl md:px-0 mx-auto text-center"
          >
            <!-- Картинка в круге -->
            <div
              class="w-32 h-32 rounded-full overflow-hidden ring-4 ring-gray-300 shadow-lg"
            >
              <img
                src="/pixel.jpg"
                alt="PIXEL Logo"
                class="object-cover w-full h-full"
              />
            </div>

            <!-- Контентный блок -->
            <div
              class="p-6 bg-white/80 rounded-2xl text-gray-900 shadow-md w-full"
            >
              <h3
                class="text-2xl font-semibold text-gray-900 mb-4 tracking-tight"
              >
                About PEPU Pixel Hub
              </h3>
              <p class="text-base text-gray-600 leading-6">
                PEPU Pixel Hub reimagines digital collectibles through pixel
                NFTs on the
                <span class="font-medium text-green-600"
                  >Layer 2 Pepe Unchained</span
                >
                network.
              </p>
              <p class="mt-3 text-base text-gray-600 leading-6">
                Every NFT generates a distinct cryptographic hash from image
                metadata — exceptional rarity earns eternal placement in the
                <span class="font-medium text-amber-600">Hall of Fame</span>.
              </p>

              <!-- Контракт и ссылки -->
              <div class="mt-6 space-y-3">
                <div
                  class="text-[0.8125rem] font-medium text-gray-500 flex items-center justify-center"
                >
                  📜 PIXEL CA:
                  <a
                    href="https://pepuscan.com/token/0x0"
                    target="_blank"
                    class="ml-1.5 text-blue-500 hover:text-blue-600 transition-colors underline decoration-transparent hover:decoration-blue-500"
                  >
                    0x0
                  </a>
                </div>

                <div class="flex space-x-6 justify-center pt-4">
                  <a
                    href="https://t.me/nft_pepu"
                    target="_blank"
                    class="text-blue-500 hover:text-blue-600 transition-colors flex items-center group"
                  >
                    <span
                      class="inline-block group-hover:scale-105 transition-transform"
                      >Telegram ↗</span
                    >
                  </a>
                  <a
                    href="https://twitter.com/pepu_nft"
                    target="_blank"
                    class="text-blue-500 hover:text-blue-600 transition-colors flex items-center group"
                  >
                    <span
                      class="inline-block group-hover:scale-105 transition-transform"
                      >Twitter ↗</span
                    >
                  </a>
                </div>
              </div>
            </div>
          </UContainer>
        </div>
      </template>
    </UTabs>
  </div>
</template>
