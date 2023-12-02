<script setup>
import {VueFinalModal} from 'vue-final-modal'
import {useRoute, useRouter} from 'vue-router'

import Cross from '@/assets/icons/cross-v2.vue'
import Minus from '@/assets/icons/minus-v2.vue'
import Plus from '@/assets/icons/add-v2.vue'
import Trash from '@/assets/icons/trash-v2.vue'
import {useCartStore} from '@/stores/cart'
import {useRestaurantStore} from '@/stores/restaurant'

import api from '@/api.js'

const router = useRouter()
const route = useRoute()
const cartStore = useCartStore()
const restaurantStore = useRestaurantStore()

const emit = defineEmits(['confirm', 'close'])

const restaurant = await restaurantStore.get(route.params.id)

cartStore.$subscribe((_, state) => {
  if (!state.cart[route.params.id]?.length) {
    emit('close')
  }
})

async function generateOrder() {
  const order = {
    restaurant_id: route.params.id,
    dishes: cartStore.cart[route.params.id],
  }
  return api.post('/order', order)
}
</script>

<template>
  <VueFinalModal
    content-class="absolute bottom-0 w-full p-2 bg-white rounded-lg flex flex-col gap-2 max-h-[90vh] overflow-auto"
    swipe-to-close="none"
    content-transition="vfm-slide-down"
    overlay-transition="vfm-fade"
  >
    <span class="inline-flex items-stretch justify-between px-2">
      <h1 class="text-xl font-medium capitalize">Pedido • {{ route.params.id }}</h1>
      <button @click="emit('close')">
        <Cross class="h-5 w-5 color-black" />
      </button>
    </span>
    <article
      v-for="dish in cartStore.cart[route.params.id]"
      :key="dish.id"
      class="flex flex-col gap-2 rounded-lg bg-white p-2 shadow"
    >
      <div class="flex">
        <div class="w-full text-left">
          <h3 class="font-medium">
            {{ restaurant.menu.find(d => d.id == dish.id).name }}
          </h3>
          <textarea
            v-model="dish.note"
            placeholder="Toca para agregar instrucciones adicionales"
            class="w-full bg-white text-sm text-gray outline-none"
            @focusout="cartStore.addNote(route.params.id, dish, dish.note)"
          />
        </div>
        <img
          class="h-14 w-14 rounded-lg"
          loading="lazy"
          :src="restaurant.menu.find(d => d.id == dish.id).image"
        />
      </div>
      <span class="flex justify-between text-lg font-medium">
        <span class="inline-flex overflow-hidden rounded-lg bg-gray-100">
          <button
            @click="cartStore.pop(route.params.id, dish.id)"
            class="px-4"
          >
            <Minus
              v-show="dish.quantity > 1"
              class="h-4 w-4 color-black"
            />
            <!-- vvv No me gusta como se ve este icono vvv -->
            <Trash
              v-show="dish.quantity <= 1"
              class="h-4 w-4 color-black"
            />
          </button>
          <span class="w-6 text-center">
            {{ dish.quantity }}
          </span>
          <button
            @click="cartStore.push(route.params.id, dish.id)"
            class="px-4"
          >
            <Plus class="h-4 w-4 color-black" />
          </button>
        </span>
        <span class="text-black">CLP {{ restaurant.menu.find(d => d.id == dish.id).price }}</span>
      </span>
    </article>
    <span class="flex justify-between px-2 text-xl font-medium text-black">
      <h2>Total</h2>
      <span>
        CLP
        {{
          cartStore.cart[route.params.id]?.reduce(
            (count, dish) => count + restaurant.menu.find(d => d.id == dish.id).price * dish.quantity,
            0
          ) ?? 0
        }}
      </span>
    </span>
    <div class="flex gap-2">
      <button
        class="h-12 w-full items-center justify-center rounded-lg bg-gray-100 font-medium text-black"
        @click="emit('close')"
      >
        Volver al menú
      </button>
      <button
        @click="() => generateOrder().then(order => router.push(`/order/${order.order_id}`))"
        class="h-12 w-full items-center justify-center rounded-lg bg-black font-medium text-white"
      >
        Generar pedido
      </button>
    </div>
    <div class="text-center text-sm">© 2023</div>
  </VueFinalModal>
</template>

<style scoped></style>
