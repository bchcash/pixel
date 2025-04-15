<script setup lang="ts">
import { ref, computed } from "vue";

const toast = useToast();
const saving = ref(false);
const drawing = ref("");
const walletAddress = ref<string | null>(null);

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
        color: "green",
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
  return `${walletAddress.value.slice(0, 6)}...${walletAddress.value.slice(
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
  <div class="my-8">
    <div class="mx-auto max-w-[400px]">
      <p class="text-center pb-4">Turn your art into PEPU NFTs!</p>

      <div v-if="walletAddress">
        <DrawPad
          save-label="Share"
          :saving="saving"
          class="max-w-[400px]"
          @save="save"
          @draw="onDraw"
        />
        <p class="text-center text-sm text-gray-500 mt-2">
          Connected: {{ shortAddress }}
        </p>
      </div>

      <div v-else class="w-full space-y-6">
        <UButton
          @click="connectWallet"
          label="Connect Metamask"
          color="primary"
          size="lg"
          block
        />
      </div>
    </div>
  </div>
</template>
