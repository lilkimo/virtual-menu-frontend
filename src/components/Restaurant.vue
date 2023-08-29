<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";

import api from "../api";
import menu from "../assets/carta.json";

const route = useRoute();
const data = ref(menu.restaurants[0]); //api.get(`/${route.params.id}`))
</script>

<template>
  <div>
    <h1 class="text-center">{{ data.name }}</h1>
    <h2>Sushi-Delivery</h2>
  </div>

  <div>
    <h1 class="bg-black bg-clip-text text-transparent selection:bg-transparent">
      <span v-for="dish in data.menu">
        <div class="grid grid-cols-12 border">
          <div class="col-start-1 col-end-4">
            <h1>Imagen</h1>
          </div>
          <div class="col-start-4 col-end-13">
            <h1>{{ dish.name }}</h1>
            <h1>{{ dish.description }}</h1>
            <h1>Precio: ${{ dish.price }}</h1>
            <h1 v-if="dish.tags.length > 0">{{ dish.tags }}</h1>
          </div>
        </div>
      </span>
    </h1>
  </div>
</template>

<style scoped></style>
