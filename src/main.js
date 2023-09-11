import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";

import { createRouter, createWebHistory } from "vue-router";

import HelloWorld from "./components/HelloWorld.vue";
import Restaurant from "./components/Restaurant.vue";
import MenuAdmin from "./components/MenuAdmin.vue";

const routes = [
  { path: "/", component: HelloWorld },
  { path: "/restaurant/:id", component: Restaurant },
  { path: "/menu/administrar", component: MenuAdmin },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);
app.use(router);
app.mount("#app");
