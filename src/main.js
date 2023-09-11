import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";

import { createRouter, createWebHistory } from "vue-router";

import HelloWorld from "./components/HelloWorld.vue";
import Restaurant from "./components/Restaurant.vue";
import ReporteVentas from "./components/ReporteVentas.vue";
import Order from './components/Order.vue'

const routes = [
  { path: "/", component: HelloWorld },
  { path: "/restaurant/:id", component: Restaurant },
  { path: "/reporteventas", component: ReporteVentas },
  { path: '/order/:id', component: Order },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

import { createPinia } from 'pinia'
import { PiniaSharedState } from 'pinia-shared-state' // pendiente

const pinia = createPinia()

import { createVfm } from 'vue-final-modal'
import 'vue-final-modal/style.css'

const vfm = createVfm()

const app = createApp(App)
app.use(router)
app.use(pinia)
app.use(vfm)
app.mount('#app')
