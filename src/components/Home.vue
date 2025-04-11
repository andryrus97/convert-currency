<script setup lang="ts">
import { ref, computed } from 'vue'
import { useCurrencyStore } from './../store.ts'
const store = useCurrencyStore()
const currentCurrencyCount = computed(() => store.getCurrencyCurrencyCount)
const currencyMapValue = computed(() => store.getCurrencyMapValue())

const currencyCount = ref(currentCurrencyCount ?? 1)

const onChangeCurrencyCount = (e: Event & { value: number}) => {
  store.setCurrencyCount(e.value)
}
</script>

<template>
  <div class="current-curr-info">
    <PrimeDataTable :value="currencyMapValue">
      <template #header>
        <PrimeInputNumber 
          @input="onChangeCurrencyCount" 
          v-model="currencyCount" 
          :minFractionDigits="1" 
          :maxFractionDigits="2"
        /> 
        {{ store.getCurrentCurrency }}
      </template>
      <PrimeColumn field="label" header="" />
      <PrimeColumn field="value" header="" />
    </PrimeDataTable>
  </div>
</template>
