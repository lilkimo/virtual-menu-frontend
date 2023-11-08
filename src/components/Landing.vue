<script setup>
import {ref} from 'vue'

import {useRoute} from 'vue-router'

import Link from '@/assets/icons/link.vue'
import QRcode from '@/assets/icons/qrcode.vue'
import Clock from '@/assets/icons/clock.vue'
import Application from '@/assets/icons/application.vue'
import Facebook from '@/assets/social media/facebook.vue'
import Youtube from '@/assets/social media/youtube.vue'
import Whatsapp from '@/assets/social media/whatsapp.vue'

const route = useRoute()
</script>

<template>
  <header class="w-full min-h-screen flex flex-col justify-between">
    <nav class="w-full h-20 flex items-center bg-[#4889F8] font-bold justify-between z-10 absolute">
      <div class="flex flex-row items-center">
        <img class="h-18 w-18 mx-3 rounded-lg" src="../assets/sushi.png"/>
        <h1 class="text-white text-3xl">Carta Virtual</h1>
      </div>
      <div class="flex flex-row gap-5 mr-5">
        <h1 class="text-white text-lg self-center">Inicia sesión</h1>
        <div class="border-0 rounded-lg px-2 py-1 bg-[#EC693C]">
          <h1 class="text-white text-lg">Regístrate</h1>
        </div>
      </div>
    </nav>

    <div class="flex flex-row flex-wrap justify-evenly flex-auto">
      <div class="flex flex-col z-10 justify-center">
        <h1 class="self-center text-center">
          <span class="self-center text-4xl text-[rgb(246,247,248)] font-semibold text-left underline underline-offset-4 decoration-[#EC693C]">Simplifica</span>
          <span class="self-center text-4xl text-[#F6F7F8] font-semibold text-left"> tu negocio<br/><br/>... con nuestra </span>
          <span class="self-center text-4xl text-[#EC693C] font-semibold text-left">aplicación 😎</span>
        </h1>
        <div class="flex flex-col">
          <div class="bg-[#EC693C] rounded-full min-w-min self-center p-2 mt-20">
            <h1 class="text-white text-lg text-center">Más información</h1>
          </div>
        </div>
      </div>
      <div class="flex z-10 justify-center">
        <img
          class="self-center z-10 absolute h-2/3"
          src="../assets/phone-1.png"
        />
      </div>
      <img
        class="self-center z-0 absolute w-full h-full"
        src="../assets/landing banner.jpg"
      />
    </div>
  </header>

  <div class="bg-[#4889F8] p-8 grid gap-8">
    <h1 class="text-4xl text-white font-semibold text-center">Funcionalidades</h1>
    <h2 class="text-white text-xl text-center">¡Descubre los increíbles beneficios de nuestra plataforma única!</h2>
    <div class="flex flex-row justify-between">
      <div class="flex flex-col w-1/2 gap-2">
        <Link class="w-24 self-center"/>
        <h1 class="text-white text-center font-semibold text-xl">Tu URL Personalizada</h1>
        <h1 class="text-black text-center px-16">¿Quieres destacar en línea? Obtén tu propia URL y atrae a más clientes.</h1>
      </div>
      <div class="flex flex-col w-1/2 gap-2">
        <QRcode class="w-24 h-24 self-center"/>
        <h1 class="text-white text-center font-semibold text-xl">Carta Virtual Interactiva</h1>
        <h1 class="text-black text-center px-16">Sorprende a tus clientes con una carta virtual atractiva y fácil de navegar.</h1>
      </div>
    </div>
    <div class="flex flex-row justify-between mb-5">
      <div class="flex flex-col w-1/2 gap-2">
        <Clock class="w-24 self-center"/>
        <h1 class="text-white text-center font-semibold text-xl">Órdenes digitales al instante</h1>
        <h1 class="text-black text-center px-16">¡Digitaliza tus órdenes de forma rápida y sencilla! Ahorra tiempo y reduce errores.</h1>
      </div>
      <div class="flex flex-col w-1/2 gap-2">
        <Application class="w-24 self-center"/>
        <h1 class="text-white text-center font-semibold text-xl">Modifica tu carta en tiempo real</h1>
        <h1 class="text-black text-center px-16">Haz cambios directos en tu carta, sin intermediarios. Más rápido y sencillo que nunca.</h1>
      </div>
    </div>
  </div>

  <div class="bg-[#EC693C] p-8">
    <h1 class="text-4xl text-black font-semibold text-center">Precios</h1>
    <h2 class="text-black text-xl flex flex-auto">Planes flexibles para cualquier tipo de negocio</h2>
    <h2 class="text-black text-xl flex flex-auto">¡Descubre tu plan ideal aquí!</h2>
  </div>

  <div class="p-8 flex flex-col justify-between">
    <div class="w-full h-20 mb-2 flex items-center font-bold justify-between">
      <div class="flex flex-row items-center">
        <img class="h-18 w-18 mx-3 rounded-lg" src="../assets/sushi.png"/>
        <h1 class="text-black text-3xl">Carta Virtual</h1>
      </div>
      <div class="flex flex-row gap-5 mr-5">
        <Facebook class="w-10 h-10 self-center"/>
        <Youtube class="w-10 h-10 self-center"/>
        <Whatsapp class="w-10 h-10 self-center"/>
        
      </div>
    </div>
    <hr class="">
    <div class="flex flex-row justify-around mt-5">
      <div>
        <h1 class="font-thin mb-3 text-sm">Conócenos</h1>
        <h1 class="text-sm">Sobre nosotros</h1>
        <h1 class="text-sm">Precios</h1>
        <h1 class="text-sm">Trabaja con nosotros</h1>
      </div>
      <div>
        <h1 class="font-thin mb-3 text-sm">Atención al cliente</h1>
        <h1 class="text-sm">Preguntas frecuentes</h1>
        <h1 class="text-sm">Centro de ayuda</h1>
      </div>
      <div>
        <h1 class="font-thin mb-3 text-sm">Contacto</h1>
        <h2 class="flex flex-auto text-sm">Calle falsa 123, Maipú</h2>
        <h2 class="flex flex-auto text-sm">+56 9 8888 8888</h2>
        <h2 class="flex flex-auto text-sm">cartavirtual@correo.com</h2>
      </div>
    </div>
  </div>

  <div class="p-2 flex justify-center">
    <h1>© 2023 Makenki Tanaki, Inc.</h1>
  </div>
</template>

<style scoped></style>
