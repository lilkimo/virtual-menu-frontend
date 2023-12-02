<script setup>
import { ref } from 'vue'

const isLoggedIn = ref(true)
</script>

<template>
  <nav class="w-full h-20 flex items-center bg-[#4889F8] font-bold justify-between z-20 fixed">
    <div class="flex flex-row items-center">
      <img class="h-18 w-18 mx-3 rounded-lg" src="../assets/sushi.png"/>
      <h1 class="text-white text-3xl">Carta Virtual</h1>
    </div>
    <div class="flex flex-row gap-5 mr-5" v-if="isLoggedIn">
      <h1 class="text-white text-lg self-center">Bienvenido/a, Usuario!</h1>
    </div>
    <div class="flex flex-row gap-5 mr-5" v-else>
      <h1 class="text-white text-lg self-center">Inicia sesión</h1>
      <div class="border-0 rounded-lg px-2 py-1 bg-[#EC693C]">
        <h1 class="text-white text-lg">Regístrate</h1>
      </div>
    </div>
  </nav>
</template>