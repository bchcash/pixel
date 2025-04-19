<script setup lang="ts">
import { ref, computed } from 'vue'
import { useToast } from '#imports'
import { navigateTo } from 'nuxt/app'
import DrawPad from '~/components/DrawPad.vue'

const toast = useToast()
const saving = ref(false)
const drawing = ref("")
const walletAddress = ref<string | null>(null)

function onDraw(dataURL: string) {
  drawing.value = dataURL
}

async function connectWallet() {
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      })
      walletAddress.value = accounts[0]
      toast.add({
        title: "Wallet Connected!",
        description: `Connected: ${shortAddress.value}`,
      })
    } catch (err) {
      console.error("User rejected connection")
    }
  } else {
    alert("Metamask is not installed.")
  }
}

const shortAddress = computed(() => {
  if (!walletAddress.value) return ""
  return `${walletAddress.value.slice(0, 4)}...${walletAddress.value.slice(-4)}`
})

async function save(dataURL: string) {
  if (saving.value) return
  if (!walletAddress.value) {
    alert("Connect your Metamask wallet first!")
    return
  }

  saving.value = true

  const blob = await fetch(dataURL).then((res) => res.blob())
  const form = new FormData()
  form.append("drawing", new File([blob], `drawing.jpg`, { type: "image/jpeg" }))
  form.append("address", walletAddress.value)

  await $fetch("/api/upload", {
    method: "POST",
    body: form,
  })
    .then(() => {
      toast.add({
        title: "Drawing shared!",
        description: "Your drawing has been shared with the world.",
        color: "green",
      })
      navigateTo("/wall") // Переход на /wall
    })
    .catch((err) => {
      toast.add({
        title: "Could not share drawing",
        description: err.data?.message || err.message,
        color: "red",
      })
    })

  saving.value = false
}
</script>

<template>
  <div class="min-h-screen bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] bg-repeat bg-cover text-center font-mono text-white flex items-center justify-center">

    <div v-if="walletAddress" class="space-y-6 w-full max-w-3xl p-6 flex flex-col items-center justify-center">
      <a
          href="/wall"
          target="_blank"
          class="text-retro-blue hover:text-retro-pink underline font-mono blink-text fade-in"
          style="animation-delay: 1.4s"
          >Hall of Fame</a
        >
      <!-- DrawPad -->
      <DrawPad
        save-label="Broadcast to the World"
        :saving="saving"
        @save="save"
        @draw="onDraw"
        class="p-6 bg-white/10 shadow-lg"
      />

      <!-- Wallet Address -->
      <p class="text-sm text-black">Creator Wallet: {{ shortAddress }}</p>
    </div>

    <div v-else class="space-y-6 w-full max-w-3xl mx-auto p-6 flex flex-col items-center justify-center">
      <button
        @click="connectWallet"
        class="bg-retro-yellow text-black px-6 py-3 hover:scale-[0.98] transition-all border-4 hover:border-retro-pink rounded-none"
      >
        🔗 Connect Wallet
      </button>

      <p class="text-mono text-gray-700 leading-7 mb-4">
        Every
        <UBadge color="primary" variant="solid" size="md" class="font-medium rounded-none">NFT</UBadge>
        generates a unique crypto
        <UBadge color="secondary" variant="solid" size="md" class="font-medium rounded-none">HASH.</UBadge>
        If it has identical characters, claim the
        <UBadge color="warning" variant="solid" size="md" class="font-medium rounded-none">Mega Pepu Airdrop!</UBadge>
        Your
        <UBadge color="primary" variant="solid" size="md" class="font-medium rounded-none">NFT</UBadge>
        will stay in the
        <UBadge color="neutral" variant="solid" size="md" class="font-medium rounded-none">Hall of Fame</UBadge>
        as a
        <UBadge color="primary" variant="solid" size="md" class="font-medium rounded-none">GoldPepuNFT</UBadge>,
        available for trading through the future
        <UBadge color="error" variant="solid" size="md" class="font-medium rounded-none">NFT Swap Pool.</UBadge>
      </p>
    </div>

  </div>
</template>

<style scoped>
/* Убираем скругления у всех badge */
:deep(.u-badge) {
  border-radius: 0 !important;
}

:deep(.u-badge span) {
  border-radius: 0 !important;
}

/* Общие стили */
.bg-retro-blue {
  background-color: #1B1F30;
}

.bg-retro-yellow {
  background-color: #ffd700;
}

.button {
  text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.3);
}

/* Стили для ссылки */
a {
  color: #1e90ff; /* Цвет ссылки */
  text-decoration: underline; /* Подчеркивание */
  font-family: 'Monospace', sans-serif; /* Моноширинный шрифт */
  font-weight: bold;
  transition: color 0.3s ease, text-decoration 0.3s ease; /* Плавное изменение стилей */
}

a:hover {
  color: #ff69b4; /* Цвет при наведении */
  text-decoration: none; /* Убираем подчеркивание при наведении */
}

/* Эффект курсора */
.blink-cursor::after {
  content: "_";
  display: inline-block;
  animation: blinkCursor 1s infinite;
}

@keyframes blinkCursor {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
</style>
