<script setup>
import {ref} from 'vue'

import {VueFinalModal} from 'vue-final-modal'
import {useRoute, useRouter} from 'vue-router'

import api from '@/api.js'
import Cross from '@/assets/icons/cross.vue'
import Minus from '@/assets/icons/minus.vue'
import Plus from '@/assets/icons/plus.vue'
import Trash from '@/assets/icons/trash.vue'
import {useCartStore} from '@/stores/cart'
import {useRestaurantStore} from '@/stores/restaurant'

const router = useRouter()
const route = useRoute()
const cartStore = useCartStore()
const restaurantStore = useRestaurantStore()

const emit = defineEmits(['confirm', 'close'])

const restaurant = await restaurantStore.get(route.params.id)
console.log(restaurant)
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
    <span class="inline-flex items-center justify-between px-2">
      <h1 class="text-xl font-medium capitalize">Pedido • {{ route.params.id }}</h1>
      <Cross
        class="h-4 w-4"
        fill="var(--black)"
        @click="emit('close')"
      />
    </span>
    <div
      v-for="dish in cartStore.cart[route.params.id]"
      :key="dish.id"
      class="flex flex-col gap-2 rounded-lg bg-white p-2 drop-shadow-lg"
    >
      <button class="flex">
        <div class="w-full text-left">
          <h2 class="font-medium">
            {{ restaurant.menu.find(d => d.id == dish.id).name }}
          </h2>
          <textarea
            v-model="dish.note"
            placeholder="Toca para agregar instrucciones adicionales"
            class="w-full text-sm text-gray outline-none bg-white"
            @focusout="cartStore.addNote(route.params.id, dish, dish.note)"
          />
        </div>
        <img
          class="h-14 w-14 rounded-lg"
          src="../assets/suchi.png"
        />
      </button>
      <span class="flex justify-between text-lg font-medium">
        <span class="inline-flex overflow-hidden rounded-lg bg-lightgray">
          <button
            @click="cartStore.pop(route.params.id, dish.id)"
            class="px-4"
          >
            <Minus
              v-if="dish.quantity > 1"
              class="h-3 w-3"
              fill="var(--black)"
            />
            <Trash
              v-else
              class="h-3 w-3"
              fill="var(--black)"
            />
          </button>
          <div class="w-6 text-center">
            {{ dish.quantity }}
          </div>
          <button
            @click="cartStore.push(route.params.id, dish.id)"
            class="px-4"
          >
            <Plus
              class="h-3 w-3"
              fill="var(--black)"
            />
          </button>
        </span>
        <span class="text-black">CLP {{ restaurant.menu.find(d => d.id == dish.id).price }}</span>
      </span>
    </div>
    <span class="flex justify-between px-2 text-xl font-medium text-black">
      <span> Total </span>
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
        class="h-12 w-full items-center justify-center rounded-lg bg-lightgray font-medium text-black drop-shadow-lg"
        @click="emit('close')"
      >
        Volver al menú
      </button>
      <button
        @click="() => generateOrder().then(order => router.push(`/order/${order.id}`))"
        class="h-12 w-full items-center justify-center rounded-lg bg-[#000] font-medium text-[#fff] drop-shadow-lg"
      >
        Generar pedido
      </button>
    </div>
    <div class="text-center text-sm">© 2023 Makenki Tanaki, Inc.</div>
  </VueFinalModal>
</template>

<style scoped></style>
