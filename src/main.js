import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";

import { createRouter, createWebHistory } from "vue-router";

import HelloWorld from "./components/HelloWorld.vue";
import Restaurant from "./components/Restaurant.vue";
import ReporteVentas from "./components/ReporteVentas.vue";
import Order from './components/Order.vue'
import MenuAdmin from "./components/MenuAdmin.vue";

const routes = [
  { path: "/", component: HelloWorld },
  { path: "/restaurant/:id", component: Restaurant },
  { path: "/order/:id", component: Order },
  { path: "/menu/administrar", component: MenuAdmin },
  { path: "/reporteventas", component: ReporteVentas },
];

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

import vue3GoogleLogin from "vue3-google-login";
const gauthClientId = "40033907361-3pog10j66hpj3pha1pj117tlkd5adn06.apps.googleusercontent.com";

const app = createApp(App)
app.use(router)
app.use(vue3GoogleLogin, {
  clientId: gauthClientId,
  scope: "email",
  prompt: "consent",
});
app.use(pinia)
app.use(vfm)
app.mount('#app')
