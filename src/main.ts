import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import router from './router'

/**
 * Prime vue
 */
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import Menubar from 'primevue/menubar'
import Button from "primevue/button"
import Select from 'primevue/select'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import InputNumber from 'primevue/inputnumber'

import App from './App.vue'

const pinia = createPinia()
const app = createApp(App)

app.component('PrimeButton', Button)
app.component('PrimeMenubar', Menubar)
app.component('PrimeSelect', Select)
app.component('PrimeDataTable', DataTable)
app.component('PrimeColumn', Column)
app.component('PrimeInputNumber', InputNumber)

app
.use(pinia)
.use(router)
.use(PrimeVue, {
  theme: {
    preset: Aura
  }
})
.mount('#app')
