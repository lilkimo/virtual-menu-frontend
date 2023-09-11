<script setup>
import { ref } from "vue"
import { useRoute, useRouter } from "vue-router"
import { useCartStore } from '../stores/cart'
import { useRestaurantStore } from '../stores/restaurant'
import { VueFinalModal } from 'vue-final-modal'

import Cross from '../assets/icons/cross.vue'
import Minus from '../assets/icons/minus.vue'
import Plus from '../assets/icons/plus.vue'
import Trash from '../assets/icons/trash.vue'

const router = useRouter()
const route = useRoute()
const cartStore = useCartStore()
const restaurantStore = useRestaurantStore()

const emit = defineEmits(['confirm', 'close'])

const data = ref(restaurantStore.get(route.params.id))
cartStore.$subscribe((_, state) => {
  if (!state.cart[route.params.id]?.length)
    emit('close')
})
</script>

<template>
  <VueFinalModal
    content-class="absolute bottom-0 w-full p-2 bg-background rounded-lg flex flex-col gap-2 max-h-[90vh] overflow-auto"
    swipe-to-close="none"
    content-transition="vfm-slide-down"
    overlay-transition="vfm-fade"
  >
    <span class="inline-flex items-center justify-between pl-2">
      <h1 class="text-xl font-medium capitalize">
        Orden • {{ route.params.id }}
      </h1>
      <Cross
        class="w-5 h-5"
        @click="emit('close')"
      />
    </span>
    <div
      v-for="dish in cartStore.cart[route.params.id]"
      :key="dish.id"
      class="flex flex-col rounded-lg drop-shadow-lg bg-background p-2 gap-2"
    >
      <button
        @click="cartStore.addNote(route.params.id, dish, 'SEXO')"
        class="flex"
      >
        <div class="w-full text-left">
          <h2 class="font-medium">
            {{ data.menu.find(d => d.id == dish.id).name }}
          </h2>
          <p
            v-if="dish.note"
            class="text-sm text-[rgb(56,55,59)]"
          >
            <b class="font-medium">Instrucciones adicionales</b>: {{ dish.note }}
          </p>
          <p
            v-else
            class="text-sm text-[rgb(56,55,59)] font-medium"
          >
            Toca para agregar instrucciones adicionales
          </p>
        </div>
        <img
          class="rounded-lg w-14 h-14"
          src="../assets/suchi.png"
        />
      </button>
      <span class="flex justify-between font-medium text-lg">
        <span class="inline-flex rounded-lg overflow-hidden bg-[#dbdbdb]">
          <button
            @click="cartStore.pop(route.params.id, dish.id)"
            class="px-4"
          >
            <Minus
              v-if="dish.quantity > 1"
              class="h-4 w-4"
            />
            <Trash
              v-else
              class="h-4 w-4"
            />
          </button>
          <div
            class="w-6 text-center"
          >
            {{ dish.quantity }}
          </div>
          <button
            @click="cartStore.push(route.params.id, dish.id)"
            class="px-4"
          >
            <Plus class="h-4 w-4"/>
          </button>
        </span>
        <span class="text-text">
          CLP {{ data.menu.find(d => d.id == dish.id).price }}
        </span>
      </span>
    </div>
    <span class="flex justify-between text-text font-medium px-2 text-xl">
      <span>
        Total
      </span>
      <span>
        CLP {{ cartStore.cart[route.params.id]?.reduce((count, dish) => count + data.menu.find(d => d.id == dish.id).price*dish.quantity, 0)?? 0 }}
      </span>
    </span>
    <div class="flex gap-2">
      <button
        class="bg-[#dbdbdb] h-12 w-full rounded-lg drop-shadow-lg text-text justify-center items-center font-medium"
        @click="emit('close')"
      >
        Volver al menú
      </button>
      <button
        @click="() => {
          console.log(JSON.stringify(cartStore.cart[route.params.id]))
          router.push(`/order/${JSON.stringify(cartStore.cart[route.params.id])}`)
        }" 
        class="bg-[#000] h-12 w-full rounded-lg drop-shadow-lg text-[#fff] justify-center items-center font-medium"
      >
        Generar orden
      </button>
    </div>
  </VueFinalModal>
</template>

<style scoped>
</style>
