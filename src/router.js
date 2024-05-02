import { createRouter, createWebHashHistory } from 'vue-router'

import AllCards from './components/all-cards.vue'
import AboutView from './components/about.vue'

const routes = [
  { path: '/', component: AllCards },
  { path: '/about', component: AboutView },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router