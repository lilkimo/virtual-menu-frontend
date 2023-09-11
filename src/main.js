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

import vue3GoogleLogin from "vue3-google-login";
const gauthClientId = "40033907361-3pog10j66hpj3pha1pj117tlkd5adn06.apps.googleusercontent.com";

const app = createApp(App)
app.use(router)
app.use(vue3GoogleLogin, {
  clientId: gauthClientId,
  scope: "email",
  prompt: "consent",
});
app.mount('#app')
