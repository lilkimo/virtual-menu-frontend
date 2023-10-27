<script setup>
import {ref} from 'vue'

import {useRoute} from 'vue-router'

const route = useRoute()
const loremipsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam id mauris luctus, consequat metus eu, lacinia justo. Nulla eu libero lacus. Nam a suscipit felis. Duis tempor turpis quis rutrum molestie. Praesent felis elit, dapibus at diam id, placerat sollicitudin mauris. Mauris molestie orci ipsum, eu scelerisque odio bibendum eu. Curabitur ipsum neque, pharetra quis iaculis eu, interdum nec libero. Suspendisse suscipit mi volutpat fringilla porta. Vivamus eget purus lacus. Praesent finibus metus urna, sit amet volutpat nulla lobortis nec. Aliquam id mi vel sapien interdum consequat a ac velit. Integer eu sapien consectetur, gravida dolor et, faucibus eros. Sed blandit luctus sem in sollicitudin. Etiam vel elit turpis. Praesent vehicula volutpat odio, at ultricies nisl vulputate interdum."
</script>

<template>
  <header class="w-full min-h-screen flex flex-col justify-between bg-[#F1FAFE]">
    <nav class="h-20 flex items-center bg-[#4682A9] font-bold justify-between">
      <div class="flex flex-row items-center">
        <img class="h-18 w-18 mx-3 rounded-lg" src="../assets/sushi.png"/>
        <h1 class="text-white text-3xl">Carta Virtual</h1>
      </div>
      <h1 class="text-white text-lg">Beneficios Precios Regístrate</h1>
    </nav>
    <div class="flex flex-row justify-evenly flex-wrap">
      <h1 class="self-center text-3xl text-[#EC693C] text-left font-semibold">
        Simplifica
        <span class="self-center text-3xl text-[#4682A9] font-semibold text-left"> tu<br/>negocio de comida rápida<br/><br/>... con nuestra </span>
        <span class="self-center text-3xl text-[#EC693C] font-semibold text-left">aplicación 😎</span>
      </h1>
      <img
        class="rounded-lg mt-6 md:max-w-xs lg:max-w-xl self-center"
        src="../assets/pexels-on-shot-2788792.jpg"
      />
    </div>
    <div class="flex flex-col pb-12">
      <div class="bg-[#EC693C] rounded-full mt-5 min-w-min self-center p-2">
        <h1 class="text-white text-lg text-center">Más información</h1>
      </div>
    </div>
  </header>

  <div class="bg-[#91C8E4] p-5">
    <h1 class="text-4xl text-white font-semibold text-center mb-4">Beneficios</h1>
    <h2 class="text-white text-center">Conecta con tus clientes de una manera innovadora</h2>
    <div>
      <div class="flex flex-row p-2">
        <div class="w-1/2">
          <img class="h-18 w-18 mx-3 rounded-lg" src="../assets/sushi.png"/>
        </div>
        <h2 class="w-1/2 text-white text-2xl font-bold">Carta QR</h2>
      </div>
      <div class="flex flex-row p-2">
        <div class="w-1/2">
          <img class="h-18 w-18 mx-3 rounded-lg" src="../assets/sushi.png"/>
        </div>
        <h2 class="w-1/2 text-white text-2xl font-bold">Ahorro de costos</h2>
      </div>
    </div>
  </div>

  <div class="bg-[#749BC2] p-5">
    <h1 class="text-4xl text-white font-semibold text-center">Precios</h1>
    <h2 class="text-white text-xl flex flex-auto">Planes flexibles para cualquier tipo de negocio</h2>
  </div>

  <div class="p-5">
    <h1 class="text-4xl text-[#749BC2] font-semibold text-center">Preguntas frecuentes</h1>
    <h2 class="text-white text-xl flex flex-auto">Para una experiencia sin complicaciones</h2>
  </div>

  <div class="bg-[#749BC2] p-5">
    <h1 class="text-4xl text-white font-semibold text-center">Contacto</h1>
    <h2 class="flex flex-auto">Calle falsa 123, Maipú</h2>
    <h2 class="flex flex-auto">+56 9 8888 8888</h2>
    <h2 class="flex flex-auto">cartavirtual@correo.com</h2>
  </div>

  <div class="p-2 flex justify-center">
    <h1>© 2023 Makenki Tanaki, Inc.</h1>
  </div>
</template>

<style scoped></style>
