import './index.css'
import 'vue-final-modal/style.css'

import {createApp} from 'vue'

import {createPinia} from 'pinia'
// import vue3GoogleLogin from 'vue3-google-login'
import {plugin as via} from 'vue-input-autowidth'
import {createVfm} from 'vue-final-modal'
import {createRouter, createWebHistory} from 'vue-router'

import App from '@/App.vue'
import Dashboard from '@/views/Dashboard.vue'
import Order from '@/views/Order.vue'
import Restaurant from '@/views/Restaurant.vue'
import User from '@/views/User.vue'

const routes = [
  {path: '/restaurant/:id', component: Restaurant, props: true},
  {path: '/order/:id', component: Order},
  {path: '/dashboard', component: Dashboard},
  {path: '/test', component: User},
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const pinia = createPinia()

const vfm = createVfm()

const gauthClientId = '40033907361-3pog10j66hpj3pha1pj117tlkd5adn06.apps.googleusercontent.com'

const app = createApp(App)
app.use(router)
// app.use(vue3GoogleLogin, {
//   clientId: gauthClientId,
//   scope: 'email',
//   prompt: 'consent',
// })
app.use(via)
app.use(pinia)
app.use(vfm)
app.mount('#app')
