import { createApp } from 'vue'
import App from './App.vue'
import './index.css'

import {
  createRouter,
  createWebHistory,
} from 'vue-router'

import HelloWorld from './components/HelloWorld.vue'
import Restaurant from './components/Restaurant.vue'

const routes = [
  { path: '/', component: HelloWorld },
  { path: '/restaurant/:id', component: Restaurant },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

import { createPinia } from 'pinia'

const pinia = createPinia()

const app = createApp(App)
app.use(router, pinia)
app.mount('#app')
