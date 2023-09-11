<script setup>
import { onMounted, ref } from "vue"
import { useRoute } from "vue-router"
import { useRestaurantStore } from '../stores/restaurant'
import QRCode from 'qrcode'

const route = useRoute()
const restaurantStore = useRestaurantStore()
const restaurant = ref(restaurantStore.get("Fukusuke"))
const data = JSON.parse(route.params.id)

const qr = await QRCode.toCanvas(`http://localhost:3000/order/${route.params.id}`)
onMounted(() => {
  document
    .getElementById('qr-container')
    .appendChild(qr)
})
</script>

<template>
  <div class="flex flex-col gap-2 p-2">
    <h1 class="text-xl font-medium capitalize text-left px-2">
      Orden • Fukusuke
    </h1>
    <div>
      <div class="text-[0.625rem] text-[rgb(56,55,59)] text-left w-full px-2">
        orden ca79884e-f793-4f6f-9f8d-71f7f01fa96e,
        <br />
        generada el 2023-09-11T19:09:03.192209
      </div>
      <div
        id="qr-container"
        class="flex justify-center"
      />
      <p  class="text-ms leading-5">
        ¡Listo! tu orden ha sido digitalizada correctamente. Llama a un Mesero y pídele que escanee este código QR.
      </p>
    </div>
    <h2 class="text-left font-medium text-xl px-2">
      Detalle
    </h2>
    <div
      v-for="dish in data"
      :key="dish.id"
      class="flex flex-col rounded-lg drop-shadow-lg bg-background p-2 gap-2"
    >
      <button
        class="flex"
      >
        <div class="w-full text-left">
          <h2 class="font-medium flex flex-col">
            {{ restaurant.menu.find(d => d.id == dish.id).name }}
            <span class="text-[0.625rem] text-[rgb(56,55,59)]">
              {{ dish.id }}
            </span>
          </h2>
          <p
            v-if="dish.note"
            class="text-sm text-[rgb(56,55,59)]"
          >
            <b class="font-medium">Instrucciones adicionales</b>: {{ dish.note }}
          </p>
        </div>
        <img
          class="rounded-lg w-14 h-14"
          src="../assets/suchi.png"
        />
      </button>
      <span class="flex justify-between font-medium text-lg">
        <span class="font-medium text-lg">
          Cantidad: {{ dish.quantity }}
        </span>
        <span class="text-text">
          CLP {{ restaurant.menu.find(d => d.id == dish.id).price }}
        </span>
      </span>
    </div>
    <span class="flex justify-between text-text font-medium px-2 text-xl">
      <span>
        Total
      </span>
      <span>
        CLP {{ data.reduce((count, dish) => count + restaurant.menu.find(d => d.id == dish.id).price*dish.quantity, 0)?? 0 }}
      </span>
    </span>
    <div class="text-sm">
      © 2023 Makenki Tanaki, Inc.
    </div>
  </div>
</template>


<style scoped>
</style>