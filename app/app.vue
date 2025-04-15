<template>
  <div class="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white text-center px-6">
    <!-- Картинка в круге -->
    <div class="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg mb-6">
      <img src="/pixel.jpg" alt="Logo" class="w-full h-full object-cover" />
    </div>

    <!-- Заголовок и описание -->
    <h1 class="text-4xl md:text-5xl font-bold tracking-tight mb-4 animate-fade-in">
      PEPU Pixel Hub
    </h1>

    <p class="text-lg text-gray-300 mb-6 max-w-xl animate-fade-in delay-300">
      We’re building something amazing on <span class="text-green-400 font-semibold">Pepe Unchained L2</span> network.
      Stay tuned — the pixel magic is coming soon!
    </p>

    <!-- Таймер -->
    <div class="flex gap-6 text-center text-2xl font-mono mb-8 animate-fade-in delay-500">
      <div>
        <div>{{ time.days }}</div>
        <div class="text-sm text-gray-400">Days</div>
      </div>
      <div>
        <div>{{ time.hours }}</div>
        <div class="text-sm text-gray-400">Hours</div>
      </div>
      <div>
        <div>{{ time.minutes }}</div>
        <div class="text-sm text-gray-400">Minutes</div>
      </div>
      <div>
        <div>{{ time.seconds }}</div>
        <div class="text-sm text-gray-400">Seconds</div>
      </div>
    </div>

    <!-- Кнопка -->
    <UButton
      label="Join our Telegram"
      to="https://t.me/nft_pepu"
      target="_blank"
      size="lg"
      color="primary"
      icon="i-lucide-send"
      class="hover:scale-105 transform transition-transform"
    />

    <p class="mt-8 text-sm text-gray-500">© 2025 PEPU Pixel Hub</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const targetDate = new Date('2025-05-01T00:00:00').getTime()
const time = ref({
  days: '00',
  hours: '00',
  minutes: '00',
  seconds: '00'
})

const updateTime = () => {
  const now = new Date().getTime()
  const distance = targetDate - now

  if (distance < 0) {
    time.value = { days: '00', hours: '00', minutes: '00', seconds: '00' }
    return
  }

  time.value.days = String(Math.floor(distance / (1000 * 60 * 60 * 24))).padStart(2, '0')
  time.value.hours = String(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0')
  time.value.minutes = String(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0')
  time.value.seconds = String(Math.floor((distance % (1000 * 60)) / 1000)).padStart(2, '0')
}

onMounted(() => {
  updateTime()
  setInterval(updateTime, 1000)
})
</script>

<style>
@keyframes fade-in {
  0% { opacity: 0; transform: translateY(10px); }
  100% { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fade-in 1s ease forwards;
}

.delay-300 { animation-delay: 0.3s; }
.delay-500 { animation-delay: 0.5s; }
</style>
