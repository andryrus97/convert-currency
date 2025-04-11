import { createWebHistory, createRouter } from 'vue-router'

import Home from './components/Home.vue'
import Convert from './components/Convert.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/convert', component: Convert }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router