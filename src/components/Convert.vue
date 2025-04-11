<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useCurrencyStore } from './../store.ts'

const store = useCurrencyStore()
const currentCurrency = computed(() => store.getCurrentCurrency)
const uniqCurrencyList = computed(() => store.getUniqCurrencyList)

const select1 = ref(currentCurrency.value)
const select2 = ref(currentCurrency.value)

const coeff = computed(() => store.getCurrencyByKey(`${select1.value}-${select2.value}`))
const currencyCount1 = ref(1)
const currencyCount2 = ref(currencyCount1.value * (coeff.value ?? 1))

watch(() => currentCurrency.value, (val) => {
  select1.value = val
  select2.value = val
})

watch(() => coeff.value, (val) => {
  currencyCount2.value = currencyCount1.value * (val ?? 1)
})

const onChangeInput1 = (e: Event & { value: number}) => {
  if (select1.value == select2.value) {
    currencyCount2.value = e.value

    return
  }

  currencyCount2.value = e.value * (coeff.value ?? 1)
}

const onChangeInput2 = (e: Event & { value: number}) => {
  if (select1.value == select2.value) {
    currencyCount1.value = e.value

    return
  }

  currencyCount1.value = e.value / (coeff.value ?? 1)
}
</script>

<template>
  <div>
    <div>
      <PrimeSelect
        v-model="select1" 
        :options="uniqCurrencyList" 
        placeholder="Select a Currency1" 
        class="w-full md:w-56"
      />
      <PrimeInputNumber
        @input="onChangeInput1"
        v-model="currencyCount1" 
        :minFractionDigits="1" 
        :maxFractionDigits="2"
      /> 
    </div>

    <div>
      <PrimeSelect
        v-model="select2" 
        :options="uniqCurrencyList" 
        placeholder="Select a Currency2" 
        class="w-full md:w-56"
      />
      <PrimeInputNumber
        @input="onChangeInput2"
        v-model="currencyCount2" 
        :minFractionDigits="1" 
        :maxFractionDigits="2"
      /> 
    </div>
  </div>
</template>
