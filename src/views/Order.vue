<script setup>
import QRCode from 'qrcode'
import {useRoute} from 'vue-router'

import OnlyMobile from '@/components/OnlyMobile.vue'

import api from '@/api.js'
import {useRestaurantStore} from '@/stores/restaurant'

const route = useRoute()
const restaurantStore = useRestaurantStore()

const restaurant = await restaurantStore.get('Fukusuke')
const order = await api.get(`/order/${route.params.id}`)

const qr = await QRCode.toDataURL(`http://localhost:8000/order/${order.order_id}`, {
  margin: 0,
  width: 250,
})

window.scrollTo(0, 0)
</script>

<template>
  <OnlyMobile>
    <div class="flex h-full flex-col gap-2 bg-white p-2 text-center">
      <h1 class="px-2 text-left text-xl font-medium capitalize">Pedido • {{ restaurant.name }}</h1>
      <ul class="w-full px-2 text-left text-xxs text-gray">
        <li>Pedido {{ order.order_id }}</li>
        <li>Generado el {{ order.created_at }}</li>
      </ul>
      <img
        :src="qr"
        class="w-3/4 self-center"
      />
      <h2 class="text-xl font-medium">¡Llama a un Mesero!</h2>
      <p>
        El restaurante <b class="font-medium">{{ restaurant.name }}</b> <u>aún no ha recibido tu pedido</u>. Llama a un
        Mesero y pídele que escanee este código QR.
      </p>
      <h2 class="px-2 text-left text-xl font-medium">Detalle</h2>
      <article
        v-for="dish in order.dishes"
        :key="dish.id"
        class="flex flex-col gap-2 rounded-lg bg-white p-2 shadow"
      >
        <div class="flex">
          <div class="w-[calc(100%_-_3.5rem)] text-left">
            <h3 class="flex flex-col font-medium">
              {{ restaurant.menu.find(d => d.id == dish.id).name }}
              <span class="text-xxs font-normal text-gray">
                {{ dish.id }}
              </span>
            </h3>
            <p
              v-show="dish.note"
              class="break-words text-sm text-gray"
            >
              <b class="font-medium">Instrucciones adicionales</b>:
              {{ dish.note }}
            </p>
          </div>
          <img
            class="h-14 w-14 rounded-lg"
            loading="lazy"
            :src="restaurant.menu.find(d => d.id == dish.id).image"
          />
        </div>
        <span class="flex justify-between text-lg">
          <span class="text-lg font-medium">Cantidad: {{ dish.quantity }}</span>
          <span class="text-black">CLP {{ restaurant.menu.find(d => d.id == dish.id).price }}</span>
        </span>
      </article>
      <span class="flex justify-between px-2 text-xl font-medium text-black">
        <h2>Total</h2>
        <span>
          CLP
          {{
            order.dishes.reduce(
              (count, dish) => count + restaurant.menu.find(d => d.id == dish.id).price * dish.quantity,
              0
            ) ?? 0
          }}
        </span>
      </span>
      <div class="text-sm">© 2023</div>
    </div>
  </OnlyMobile>
</template>

<style scoped></style>
