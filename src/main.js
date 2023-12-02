import './index.css'
import 'vue-final-modal/style.css'

import {createApp} from 'vue'

import {createPinia} from 'pinia'
import vue3GoogleLogin from 'vue3-google-login'
import {createVfm} from 'vue-final-modal'
import {createRouter, createWebHistory} from 'vue-router'

import App from './App.vue'
import Admin from './components/Admin.vue'
import HelloWorld from './components/HelloWorld.vue'
import Login from './components/Login.vue'
import MenuAdmin from './components/MenuAdmin.vue'
import Order from './components/Order.vue'
import Register from './components/Register.vue'
import ReporteVentas from './components/ReporteVentas.vue'
import Restaurant from './components/Restaurant.vue'
import Landing from './components/Landing.vue'

const routes = [
  {path: '/', component: Landing},
  {path: '/restaurant/:id', component: Restaurant},
  {path: '/order/:id', component: Order},
  {path: '/menu/administrar', component: MenuAdmin},
  {path: '/reporteventas', component: ReporteVentas},
  {path: '/login', component: Login},
  {path: '/admin', component: Admin},
  {path: '/register', component: Register},
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
app.use(vue3GoogleLogin, {
  clientId: gauthClientId,
  scope: 'email',
  prompt: 'consent',
})
app.use(pinia)
app.use(vfm)
app.mount('#app')
