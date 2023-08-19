<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

import api from '../api'
import menu from '../assets/carta.json'

const route = useRoute()
const data = ref(menu.restaurants[0])//api.get(`/${route.params.id}`))
</script>

<template>
  <h1
    class="bg-gradient-to-r from-green-600 to-sky-400 bg-clip-text text-5xl font-black text-transparent selection:bg-transparent"
  >
    {{ data.name }}
    <span v-for="dish in data.menu">
      {{ dish.name }}
    </span>
  </h1>
</template>

<style scoped>
</style>
