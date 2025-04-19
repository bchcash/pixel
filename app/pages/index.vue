<template>
  <div
    class="welcome-page min-h-screen bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] bg-repeat bg-cover px-6 py-12 bg-gray-200 relative"
  >
    <div class="max-w-4xl mx-auto relative">
      <header class="header text-center mb-16">
        <h1
          class="text-4xl md:text-5xl font-mono text-retro-blue tracking-wider blink-cursor"
        >
          P I X E L
        </h1>
        <p
          class="mt-4 text-lg font-mono text-gray-800 fade-in"
          style="animation-delay: 0.2s"
        >
          PEPU ❤️ NFT
        </p>
        <p
          class="mt-4 text-md font-mono text-gray-800 fade-in"
          style="animation-delay: 0.3s"
        >
          NFT hub for creating and trading pepu art on-chain. Enjoi.
        </p>

        <div class="smart-contract mt-6">
          <a
            href="https://pepuscan.com/token/0xEcd2BAfEB49ACc6c6C820DBB537946988b67EbD3"
            target="_blank"
            class="font-mono p-2 border-4 border-retro-yellow inline-block bg-gray-100 text-retro-blue hover:text-retro-pink underline"
          >
            0xecd...7ebd3
          </a>
        </div>
      </header>

      <div class="features grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
        <div
          class="feature-card bg-gray-100 p-4 border-4 border-retro-blue shadow-[8px_8px_0_0_rgba(0,0,255,0.5)] hover-spin fade-in"
          style="animation-delay: 0.5s"
        >
          <h3 class="text-lg font-mono text-retro-blue mb-1">⚡ Fast</h3>
          <p class="text-gray-800 text-sm font-mono">
            Built on cutting-edge tech for blazing-fast performance.
          </p>
        </div>
        <div
          class="feature-card bg-gray-100 p-4 border-4 border-retro-green shadow-[8px_8px_0_0_rgba(0,255,0,0.5)] hover-spin fade-in"
          style="animation-delay: 0.6s"
        >
          <h3 class="text-lg font-mono text-retro-green mb-1">🛠️ Modular</h3>
          <p class="text-gray-800 text-sm font-mono">
            Designed for easy integration and scalability.
          </p>
        </div>
        <div
          class="feature-card bg-gray-100 p-4 border-4 border-retro-pink shadow-[8px_8px_0_0_rgba(255,105,180,0.5)] hover-spin fade-in"
          style="animation-delay: 0.7s"
        >
          <h3 class="text-lg font-mono text-retro-pink mb-1">🎨 Stylish</h3>
          <p class="text-gray-800 text-sm font-mono">
            A clean and minimal design for all devices.
          </p>
        </div>
      </div>

      <div class="cta text-center mb-16 flex justify-center gap-4">
        <NuxtLink
          to="/wall"
          class="button bg-blue-600 text-white px-6 py-3 border-4 border-white font-mono fade-in"
          style="animation-delay: 0.8s"
        >
          Hall of Fame
        </NuxtLink>
        <NuxtLink
          to="/draw"
          class="button bg-green-600 text-white px-6 py-3 border-4 border-white font-mono fade-in"
          style="animation-delay: 0.9s"
        >
          Mint NFT
        </NuxtLink>
      </div>

      <div class="max-w-2xl mx-auto space-y-4 mb-16">
        <div
          v-for="(item, index) in roadmapItems"
          :key="index"
          :class="[
            'p-5 border-4 shadow-[8px_8px_0_0_rgba(0,0,0,0.3)] flex items-start gap-3',
            roadmapColors[index % roadmapColors.length].bg,
            roadmapColors[index % roadmapColors.length].border,
          ]"
        >
          <div
            class="p-3 border-2 flex items-center justify-center spin"
            :class="roadmapColors[index % roadmapColors.length].iconBorder"
          >
            <UIcon :name="item.icon" class="w-6 h-6 text-retro-blue" />
          </div>
          <div class="flex-1">
            <h3 class="font-mono text-retro-blue text-shadow">
              {{ item.title }}
            </h3>
            <p class="mt-1 text-sm text-gray-800 font-mono leading-5">
              {{ item.description }}
              <NuxtLink
                v-if="item.link"
                :to="item.link"
                class="text-retro-pink hover:text-retro-yellow underline blink-text"
              >
                others' art. <span class="text-[0.875em]">↗</span>
              </NuxtLink>
            </p>
            <div class="mt-3">
              <UBadge
                variant="solid"
                size="lg"
                class="font-mono bg-black text-white"
              >
                {{ item.status }}
              </UBadge>
            </div>
          </div>
        </div>
      </div>

      <div class="social-links flex justify-center gap-6">
        <a
          href="https://x.com/pepu_nft"
          target="_blank"
          class="text-retro-blue hover:text-retro-pink underline font-mono blink-text fade-in"
          style="animation-delay: 1.3s"
          >Twitter</a
        >
        <a
          href="https://t.me/nft_pepu"
          target="_blank"
          class="text-retro-blue hover:text-retro-pink underline font-mono blink-text fade-in"
          style="animation-delay: 1.4s"
          >Telegram</a
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const goToHallOfFame = () => {
  router.push("/hall-of-fame");
};

const mintNFT = () => {
  alert("Minting NFT... 🚀"); // Placeholder for actual mint logic
};

const roadmapItems = [
  {
    icon: "i-lucide-rocket",
    title: "Platform Launch",
    description: "PEPU Pixel Hub launches with NFT creation platform",
    status: "Live",
  },
  {
    icon: "i-lucide-sparkles",
    title: "Hall of Fame Update",
    description: "Browse all NFTs and discover",
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
    bg: "bg-retro-cyan",
    border: "border-retro-cyan",
    iconBorder: "border-retro-yellow",
  },
  {
    bg: "bg-retro-pink",
    border: "border-retro-pink",
    iconBorder: "border-retro-blue",
  },
  {
    bg: "bg-retro-green",
    border: "border-retro-green",
    iconBorder: "border-retro-pink",
  },
  {
    bg: "bg-retro-yellow",
    border: "border-retro-yellow",
    iconBorder: "border-retro-blue",
  },
];
</script>

<style scoped>
/* 🎨 Цвета ретро-палитры */
:root {
  --retro-blue: #1e90ff;
  --retro-yellow: #ffd700;
  --retro-green: #00dc82;
  --retro-pink: #ff69b4;
  --retro-black: #181818;
  --retro-orange: #ff4500; /* Новый цвет */
  --retro-purple: #800080; /* Новый цвет */
  --retro-cyan: #00ffff; /* Новый цвет */
  --retro-teal: #008080; /* Новый цвет */
  --retro-magenta: #ff00ff; /* Новый цвет */
}

/* 🖍️ Текстовые цвета */
.retro-blue {
  @apply text-[#1e90ff];
}
.retro-yellow {
  @apply text-[#ffd700];
}
.retro-green {
  @apply text-[#00DC82];
}
.retro-pink {
  @apply text-[#ff69b4];
}
.retro-black {
  @apply text-[#181818];
}
.retro-orange {
  @apply text-[#ff4500]; /* Новый цвет */
}
.retro-purple {
  @apply text-[#800080]; /* Новый цвет */
}
.retro-cyan {
  @apply text-[#00ffff]; /* Новый цвет */
}
.retro-teal {
  @apply text-[#008080]; /* Новый цвет */
}
.retro-magenta {
  @apply text-[#ff00ff]; /* Новый цвет */
}

/* 🖌️ Фоны */
.bg-retro-blue {
  @apply bg-[#1e90ff];
}
.bg-retro-yellow {
  @apply bg-[#ffd700];
}
.bg-retro-green {
  @apply bg-[#00DC82];
}
.bg-retro-pink {
  @apply bg-[#ff69b4];
}
.bg-retro-black {
  @apply bg-[#181818];
}
.bg-retro-orange {
  @apply bg-[#ff4500]; /* Новый цвет */
}
.bg-retro-purple {
  @apply bg-[#800080]; /* Новый цвет */
}
.bg-retro-cyan {
  @apply bg-[#00ffff]; /* Новый цвет */
}
.bg-retro-teal {
  @apply bg-[#008080]; /* Новый цвет */
}
.bg-retro-magenta {
  @apply bg-[#ff00ff]; /* Новый цвет */
}

/* 📏 Бордеры */
.border-retro-blue {
  @apply border-[#1e90ff];
}
.border-retro-yellow {
  @apply border-[#ffd700];
}
.border-retro-green {
  @apply border-[#00DC82];
}
.border-retro-pink {
  @apply border-[#ff69b4];
}
.border-retro-black {
  @apply border-[#181818];
}
.border-retro-orange {
  @apply border-[#ff4500]; /* Новый цвет */
}
.border-retro-purple {
  @apply border-[#800080]; /* Новый цвет */
}
.border-retro-cyan {
  @apply border-[#00ffff]; /* Новый цвет */
}
.border-retro-teal {
  @apply border-[#008080]; /* Новый цвет */
}
.border-retro-magenta {
  @apply border-[#ff00ff]; /* Новый цвет */
}

/* ✨ Анимации */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes blinkCursor {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}

@keyframes marquee {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes blinkText {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.2;
  }
}

/* 🖥️ Готовые классы */
.fade-in {
  animation: fadeIn 0.6s ease-out forwards;
}

.blink-cursor::after {
  content: "_";
  display: inline-block;
  animation: blinkCursor 1s infinite;
}

.marquee {
  white-space: nowrap;
  overflow: hidden;
  display: inline-block;
  animation: marquee 5s linear infinite;
}

.spin {
  animation: spin 20s linear infinite;
}

.hover-spin:hover {
  animation: spin 1s linear;
}

.blink-text {
  animation: blinkText 1s infinite;
}

.text-shadow {
  text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.3);
}
</style>
