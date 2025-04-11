import { defineStore } from 'pinia'
import type { ICurrency, ITableCurrency } from './interfaces'

export const useCurrencyStore = defineStore('currency', {
  state: () => ({ 
    isLoading: false,
    currentCurrencyCount: 1,
    currentCurrency: '', 
    allCurrencies: {} as ICurrency,
    uniqCurrencyList: new Set<string>(),
    currencyMap: new Map<string, ITableCurrency[]>()
  }),
  getters: {
    getLoadingStatus: (state) => state.isLoading,
    getCurrentCurrency: (state) => state.currentCurrency,
    getCurrencyCurrencyCount: (state) => state.currentCurrencyCount,
    getUniqCurrencyList: (state) => [...state.uniqCurrencyList.keys()],
    getAllCurrenciesKeys: (state) => Object.keys(state.allCurrencies),
    getCurrencyByKey: (state) => {
      return (key: string) => state.allCurrencies[key]
    },
    getFirstUniqCurrency(): string {
      return this.getUniqCurrencyList[0]
    },
    getCurrencyMapValue: (state) => {
      return (key: string = state.currentCurrency) => {
        return state.currencyMap.get(key)?.map(currency => {
          return { ...currency, value: +(currency.value * state.currentCurrencyCount).toFixed(2) }
        })
      }
    }
  },
  actions: {
    async initCurrency() {
      try {
        this.isLoading = true
        const response = await fetch('https://status.neuralgeneration.com/api/currency')
        this.allCurrencies = await response.json()
        this.fillUniqCurrency()
        this.currentCurrency = this.getFirstUniqCurrency
      } catch(e) {
        console.error('Ошибка загрузки списка валют: ', e)
      } finally {
        this.isLoading = false
      }
    },
    fillUniqCurrency() {
      // тут формируется список валют на основе данных, полученных по api и заполняется мапа
      if (this.allCurrencies) {
        for (let curr of this.getAllCurrenciesKeys) {
          curr.split('-').forEach(key => {
            if (!this.uniqCurrencyList.has(key)) {
              this.uniqCurrencyList.add(key)
              this.addCurrMap(key)
            }
          })
        }
      }
    },
    setCurrentCurrency(newCurrency: string) {
      this.currentCurrency = newCurrency
    },
    setCurrencyCount(newCount: number) {
      this.currentCurrencyCount = newCount
    },
    addCurrMap(currKey: string) {
      if (!currKey) currKey = this.currentCurrency

      const keys = this.getAllCurrenciesKeys
      const resultObj = [] as ITableCurrency[]

      if (this.allCurrencies && keys.length !== 0) {
        keys
          .filter(current => current.split('-')[0] == currKey)
          .forEach(key => {
            resultObj.push({
              label: key.split('-')[1],
              value: +(this.allCurrencies[key] * this.currentCurrencyCount).toFixed(2)
            })
          })

        this.currencyMap.set(currKey, resultObj)
      }
    }
  },
})