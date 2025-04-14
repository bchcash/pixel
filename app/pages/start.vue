<template>
    <div class="welcome-page">
      <header class="header">
        <h1>Welcome to Nuxt 3!</h1>
        <p>Start building amazing things 🚀</p>
      </header>
  
      <div class="features">
        <div class="feature-card">
          <h3>⚡ Fast</h3>
          <p>Built on Vue 3 and Vite for blazing-fast performance.</p>
        </div>
        <div class="feature-card">
          <h3>🛠️ Modular</h3>
          <p>Automatic imports and file-based routing.</p>
        </div>
        <div class="feature-card">
          <h3>🎨 Stylish</h3>
          <p>Easy styling with Tailwind, SCSS, or CSS Modules.</p>
        </div>
      </div>
  
      <div class="cta">
        <button @click="connectWallet" class="button">
          {{ walletAddress ? shortAddress : 'Connect Metamask' }}
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const walletAddress = ref(null)
  
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
        walletAddress.value = accounts[0]
      } catch (err) {
        console.error('User rejected the request')
      }
    } else {
      alert('Metamask is not installed. Please install it to use this feature.')
    }
  }
  
  const shortAddress = computed(() => {
    if (!walletAddress.value) return ''
    return `${walletAddress.value.slice(0, 6)}...${walletAddress.value.slice(-4)}`
  })
  </script>
  
  <style scoped>
  .welcome-page {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
    text-align: center;
  }
  
  .header {
    margin-bottom: 3rem;
  }
  
  .header h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: #181818;
  }
  
  .header p {
    font-size: 1.2rem;
    color: #666;
  }
  
  .features {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
    margin-bottom: 3rem;
  }
  
  .feature-card {
    padding: 1.5rem;
    border-radius: 8px;
    background: #f9f9f9;
    transition: transform 0.2s;
  }
  
  .feature-card:hover {
    transform: translateY(-5px);
  }
  
  .feature-card h3 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }
  
  .button {
    display: inline-block;
    padding: 0.75rem 1.5rem;
    background: #00DC82;
    color: white;
    border-radius: 4px;
    text-decoration: none;
    font-weight: bold;
    transition: background 0.2s;
    cursor: pointer;
  }
  
  .button:hover {
    background: #00b369;
  }
  </style>
  
