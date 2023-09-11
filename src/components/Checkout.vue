<script setup>
import { ref } from "vue"
import { useRoute } from "vue-router";
import { useCartStore } from '../stores/cart'
import { useRestaurantStore } from '../stores/restaurant'
import { VueFinalModal } from 'vue-final-modal'

const route = useRoute();
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
    <span class="flex justify-between pl-2">
      <h1 class="text-xl font-medium capitalize">
        {{ route.params.id }}
      </h1>
      <button
        class="px-2"
        @click="emit('close')"
      >
        X
      </button>
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
          <h2 class="font-medium">{{ dish.id }}</h2>
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
      <span class="flex justify-between">
        <span class="rounded-lg overflow-hidden bg-[#dbdbdb]">
          <button
            @click="cartStore.pop(route.params.id, dish.id)"
            class="px-4"
          >
            <span v-if="dish.quantity > 1">
              -
            </span>
            <span v-else>
              b
            </span>
          </button>
          <span
            v-text="dish.quantity"
            class="text-sm font-medium"
          />
          <button
            @click="cartStore.push(route.params.id, dish.id)"
            class="px-4"
          >
            +
          </button>
        </span>
        <span class="font-medium text-sm text-text">
          CLP {{ data.menu.find(d => d.name == dish.id).price }}
        </span>
      </span>
    </div>
    <span class="flex justify-between text-text font-medium px-2 text-lg">
      <span>
        Total
      </span>
      <span>
        CLP {{ cartStore.cart[route.params.id]?.reduce((count, dish) => count + data.menu.find(d => d.name == dish.id).price*dish.quantity, 0)?? 0 }}
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
        class="bg-[#000] h-12 w-full rounded-lg drop-shadow-lg text-[#fff] justify-center items-center font-medium"
      >
        Generar orden
      </button>
    </div>
  </VueFinalModal>
</template>

<style scoped>
</style>
