<script setup>
import { ref } from "vue"
import { useRoute } from "vue-router"
import { useModal } from 'vue-final-modal'

import api from "../api"
import menu from "../assets/carta.json"
import Checkout from "./Checkout.vue"
import { useCartStore } from '../stores/cart'
import { useRestaurantStore } from "../stores/restaurant"

const route = useRoute()

const cartStore = useCartStore()
const restaurantStore = useRestaurantStore()

const data = ref(restaurantStore.get(route.params.id))

const tags = {
  'vegano': 'text-[#042204] border-[#17ad17] bg-[#b8f6b8]',
  'vegetariano': 'text-[#042204] border-[#17ad17] bg-[#b8f6b8]',
  'camarón': 'text-[#4e0000] border-[#ff8989] bg-[#ffc4c4]',
  'sin gluten': 'text-[#493702] border-[#f8c52b] bg-[#fbdf8a]',
  'sin lactosa': 'text-[#060d21] border-[#6039da] bg-[#bdcbf3]',
}

const { open, close } = useModal({
  component: Checkout,
  attrs: {
    onConfirm() {
      close()
    },
    onClose() {
      close()
    },
  },
})
</script>

<template>
  <div>
    <div class="sticky top-0 z-10 flex justify-center bg-[#79f]">
      <div class="flex items-center justify-end">
        <img src="../assets/sushi.png" />
      </div>
      <div class="flex items-center">
        <div>
          <h1 class="text-center text-[#FAF1E4]">{{ data.name }}</h1>
          <h2 class="text-center text-[#FAF1E4]">Sushi-Delivery</h2>
        </div>
      </div>
    </div>

    <div class="bg-background p-2">
      <button
        v-for="dish in data.menu"
        class="mb-2 flex gap-2 rounded-lg bg-background px-4 py-2 drop-shadow-lg w-full"
        @click="cartStore.push('fukusuke', dish.name)"
      >
        <div class="flex flex-col gap-1 w-full">
          <div class="flex flex-row-reverse gap-1 justify-between">
            <img
              class="rounded-lg w-28 h-28"
              src="../assets/suchi.png"
            />
            <div class="flex flex-col gap-1">
              <span class="text-left text-text font-medium">
                {{ dish.name }}
              </span>
              <span class="text-left text-sm text-text">
                CLP {{ dish.price }}
              </span>
              <span class="text-left text-sm text-[rgb(56,55,59)] h-full">
                {{ dish.description }}
              </span>
            </div>
          </div>
          <div class="flex flex-wrap gap-1">
            <span
              v-for="tag in dish.tags"
              class="py-1 place-self-center rounded-lg border-solid px-2 font-bold text-xs leading-3 uppercase whitespace-nowrap"
              :class="tags[tag]"
            >
              {{ tag }}
            </span>
          </div>
        </div>
      </button>
      <div class="h-20 text-sm">
        © 2023 Makenki Tanaki, Inc.
      </div>
    </div>

    <footer
      v-show="cartStore.cart[route.params.id]?.length"
      class="w-full h-16 fixed z-10 bottom-0 p-2 pt-0"
    >
      <!-- "() => router.push(`/checkout/${route.params.id}`)" -->
      <button
        class="flex bg-[#000] w-full h-full rounded-lg drop-shadow-lg text-[#fff] justify-center items-center font-medium"
        @click="() => open()"
      >
        <div class="h-6 flex flex-col overflow-hidden">
          <div class="text-right infinity-scroll">
            Pagar ({{ cartStore.count(route.params.id) }} plato{{ cartStore.count(route.params.id) > 1? 's': '' }})
            <br />
            Modificar orden
            <br />
            Pagar ({{ cartStore.count(route.params.id) }} plato{{ cartStore.count(route.params.id) > 1? 's': '' }})
          </div>
        </div>
        <span>
          &nbsp;• CLP {{ cartStore.cart[route.params.id]?.reduce((count, dish) => count + data.menu.find(d => d.name == dish.id).price*dish.quantity, 0)?? 0 }}
        </span>
      </button>
    </footer>
  </div>
</template>

<style scoped>
.infinity-scroll {
  animation: bounce 10s ease infinite;
}

@keyframes bounce {
  0%, 20% {
    transform: translateY(0rem);
  }
  30%, 70% {
    transform: translateY(calc(-100%/3));
  }
  80%, 100% {
    transform: translateY(calc(-100%*2/3));
  }
}
</style>
