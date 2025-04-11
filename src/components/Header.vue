<script setup lang="ts">
import { ref, computed, watch } from "vue"
import { useCurrencyStore } from './../store.ts'

const store = useCurrencyStore()
const currentCurrency = computed(() => store.getCurrentCurrency)
const uniqCurrencyList = computed(() => store.getUniqCurrencyList)
const isLoadingCurrencyList = computed(() => store.getLoadingStatus)

let selectedCurrency = ref<string>(currentCurrency.value)

const menuItems = ref([
  {
    label: 'Home',
    route: '/'
  },
  {
    label: 'Convert',
    route: '/convert'
  }
])

watch(() => currentCurrency.value, (val) => {
  selectedCurrency.value = val
})

const onChangeCurrency = (e: Event & { value: string}) => {
  store.setCurrentCurrency(e.value)
}
</script>

<template>
  <header class="header">
    <PrimeMenubar :model="menuItems">
      <template #item="{ item, props }">
          <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
            <a :href="href" v-bind="props.action" @click="navigate">
              <span :class="item.icon" />
              <span>{{ item.label }}</span>
            </a>
          </router-link>
      </template>
      <template #end>
        <PrimeSelect @change="onChangeCurrency" v-model="selectedCurrency" :options="uniqCurrencyList" placeholder="Select a Currency" class="w-full md:w-56"/>
        <PrimeButton @click="store.initCurrency()">
          <img v-if="isLoadingCurrencyList" src="https://www.yonicare.fstea.co.za/assets/images/page-loading.gif" alt="loader">
          <p>Загрузить список валют</p>
        </PrimeButton>
      </template>
    </PrimeMenubar>
  </header>
</template>

<style lang="scss">
.header {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9999;

  .p-menubar-end {
    display: flex;

    .p-select {
      display: flex;
      align-items: center;
      margin-right: 20px;
    }

    .p-button {
      display: flex;
      justify-content: space-between;
      align-items: center;

      img {
        width: 40px;
        // height: 30px;
      }
    }
  }
}
</style>
