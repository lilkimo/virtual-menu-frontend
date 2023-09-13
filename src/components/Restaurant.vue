<script setup>
import {useModal} from 'vue-final-modal'
import {useRoute} from 'vue-router'

import {useCartStore} from '../stores/cart'
import {useRestaurantStore} from '../stores/restaurant'
import Cart from './Cart.vue'

const route = useRoute()

const cartStore = useCartStore()
const restaurantStore = useRestaurantStore()

const data = restaurantStore.get(route.params.id)

const tags = {
  vegano: 'text-[#042204] border-[#17ad17] bg-[#b8f6b8]',
  vegetariano: 'text-[#042204] border-[#17ad17] bg-[#b8f6b8]',
  camarón: 'text-[#4e0000] border-[#ff8989] bg-[#ffc4c4]',
  'sin gluten': 'text-[#493702] border-[#f8c52b] bg-[#fbdf8a]',
  'sin lactosa': 'text-[#060d21] border-[#6039da] bg-[#bdcbf3]',
}

const {open, close} = useModal({
  component: Cart,
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
        class="mb-2 flex w-full gap-2 rounded-lg bg-background px-4 py-2 drop-shadow-lg"
        @click="cartStore.push('fukusuke', dish.id)"
      >
        <div class="flex w-full flex-col gap-1">
          <div class="flex flex-row-reverse justify-between gap-1">
            <img
              class="h-28 w-28 rounded-lg"
              src="../assets/suchi.png"
            />
            <div class="flex flex-col gap-1">
              <span class="text-left font-medium text-text">
                {{ dish.name }}
              </span>
              <span class="text-left text-sm text-text"> CLP {{ dish.price }} </span>
              <span class="h-full text-left text-sm text-[rgb(56,55,59)]">
                {{ dish.description }}
              </span>
            </div>
          </div>
          <div class="flex flex-wrap gap-1">
            <span
              v-for="tag in dish.tags"
              class="place-self-center whitespace-nowrap rounded-lg border-solid px-2 py-1 text-xs font-bold uppercase leading-3"
              :class="tags[tag]"
            >
              {{ tag }}
            </span>
          </div>
        </div>
      </button>
      <div class="h-20 text-sm">© 2023 Makenki Tanaki, Inc.</div>
    </div>

    <footer
      v-show="cartStore.cart[route.params.id]?.length"
      class="fixed bottom-0 z-10 h-16 w-full p-2 pt-0"
    >
      <button
        class="flex h-full w-full items-center justify-center rounded-lg bg-[#000] font-medium text-[#fff] drop-shadow-lg"
        @click="() => open()"
      >
        <div class="flex h-6 flex-col overflow-hidden">
          <div class="infinity-scroll text-right">
            Pagar ({{ cartStore.count(route.params.id) }} plato{{
              cartStore.count(route.params.id).value > 1 ? 's' : ''
            }})
            <br />
            Modificar orden
            <br />
            Pagar ({{ cartStore.count(route.params.id) }} plato{{
              cartStore.count(route.params.id).value > 1 ? 's' : ''
            }})
          </div>
        </div>
        <span>
          &nbsp;• CLP
          {{
            cartStore.cart[route.params.id]?.reduce(
              (count, dish) => count + data.menu.find(d => d.id == dish.id).price * dish.quantity,
              0
            ) ?? 0
          }}
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
  0%,
  20% {
    transform: translateY(0rem);
  }
  30%,
  70% {
    transform: translateY(calc(-100% / 3));
  }
  80%,
  100% {
    transform: translateY(calc(-100% * 2 / 3));
  }
}
</style>
