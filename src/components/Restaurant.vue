<script setup>
import {ref} from 'vue'

import {useModal} from 'vue-final-modal'
import {useRoute} from 'vue-router'

import Cart from './Cart.vue'
import Cross from '@/assets/icons/cross.vue'
import Geo from '@/assets/icons/geo.vue'
import Loupe from '@/assets/icons/loupe.vue'
import {useCartStore} from '@/stores/cart'
import {useRestaurantStore} from '@/stores/restaurant'

const route = useRoute()

const cartStore = useCartStore()
const restaurantStore = useRestaurantStore()

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

const tags = {
  vegano: 'text-[#042204] border-[#17ad17] bg-[#b8f6b8]',
  vegetariano: 'text-[#042204] border-[#17ad17] bg-[#b8f6b8]',
  camarón: 'text-[#4e0000] border-[#ff8989] bg-[#ffc4c4]',
  'sin gluten': 'text-[#493702] border-[#f8c52b] bg-[#fbdf8a]',
  'sin lactosa': 'text-[#060d21] border-[#6039da] bg-[#bdcbf3]',
}

const restaurant = await restaurantStore.get(route.params.id, true)
const search_query = ref('')
const menu = () => restaurant.menu.filter(d => d.name.toLowerCase().includes(search_query.value.toLowerCase()))
</script>

<template>
  <div>
    <div class="w-full max-h-[25vh] overflow-hidden">
      <img src="@/assets/banner.jpg" />
    </div>
    <header class="sticky top-0 z-10 flex flex-col justify-center bg-white p-2 gap-2">
      <div class="flex flex-col w-full px-4">
        <span class="font-bold text-3xl">
          {{ restaurant.name }}
        </span>
        <span class="text-sm text-gray flex items-center gap-1">
          <Geo
            class="h-3.5 w-3.5"
            fill="var(--gray)"
          />
          {{ restaurant.address }}
        </span>
      </div>
      <div class="bg-white rounded-lg drop-shadow-lg flex">
        <div class="flex flex-1 px-3 items-center">
          <Loupe
            class="h-3.5 w-3.5"
            fill="var(--gray)"
          />
        </div>
        <input
          v-model="search_query"
          class="bg-white py-2 w-full h-full focus:outline-none placeholder:text-sm placeholder:text-gray"
          placeholder="Toca acá para buscar platos por su nombre"
        />
        <button
          @click="() => (search_query = '')"
          class="flex-1 px-3"
        >
          <Cross
            class="h-3.5 w-3.5"
            fill="var(--gray)"
          />
        </button>
      </div>
    </header>

    <div class="flex flex-col bg-white p-2 gap-6">
      <div
        v-for="category in restaurant.categories"
        v-show="
          menu()
            .map(d => d.categories)
            .flat()
            .includes(category)
        "
        class="flex flex-col gap-2"
      >
        <div class="text-left capitalize font-bold px-4 text-lg">
          {{ category }}
        </div>
        <button
          v-for="dish in menu()
            .filter(d => d.categories.includes(category))
            .sort((d1, d2) => d1.name.toLowerCase().localeCompare(d2.name.toLowerCase()))"
          @click="cartStore.push('fukusuke', dish.id)"
          class="flex w-full gap-2 rounded-lg bg-white px-4 py-2 drop-shadow-lg"
        >
          <div class="flex w-full flex-col gap-1">
            <div class="flex flex-row-reverse justify-between gap-1">
              <img
                class="h-28 w-28 rounded-lg"
                src="../assets/suchi.png"
              />
              <div class="flex flex-col gap-1">
                <span class="text-left font-medium text-black">
                  {{ dish.name }}
                </span>
                <span class="text-left text-sm text-black"> CLP {{ dish.price }} </span>
                <span class="h-full text-left text-sm text-gray">
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
      </div>
      <div class="text-sm text-center">© 2023 Makenki Tanaki, Inc.</div>
      <div
        v-show="cartStore.cart[route.params.id]?.length"
        class="h-10"
      />
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
            Pedir ({{ cartStore.count(route.params.id) }} plato{{
              cartStore.count(route.params.id).value > 1 ? 's' : ''
            }})
            <br />
            Modificar pedido
            <br />
            Pedir ({{ cartStore.count(route.params.id) }} plato{{
              cartStore.count(route.params.id).value > 1 ? 's' : ''
            }})
          </div>
        </div>
        <span>
          &nbsp;• CLP
          {{
            cartStore.cart[route.params.id]?.reduce(
              (count, dish) => count + restaurant.menu.find(d => d.id == dish.id).price * dish.quantity,
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
