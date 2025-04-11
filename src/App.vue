<script setup lang="ts">
import Header from './components/Header.vue'
import { useCurrencyStore } from './store.ts'
import { onMounted } from 'vue'

onMounted(async () => {
  const store = useCurrencyStore()
  await store.initCurrency()
})
</script>

<template>
  <Header />
  <div class="container">
    <RouterView />
  </div>
</template>

<style lang="scss">
.container {
  width: 100%;
}
</style>
