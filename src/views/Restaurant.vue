<script setup>
import {ref, computed} from 'vue'

import {useModal} from 'vue-final-modal'

import Cart from '@/views/Cart.vue'
import OnlyMobile from '@/components/OnlyMobile.vue'

import Cross from '@/assets/icons/cross-v2.vue'
import Geo from '@/assets/icons/location-v2.vue'
import Loupe from '@/assets/icons/search-normal-1-v2.vue'
import Price from '@/assets/icons/dollar-circle.vue'

import {useCartStore} from '@/stores/cart'
import {useRestaurantStore} from '@/stores/restaurant'

import tags from '@/tags_styles.js'

const props = defineProps({
  id: String,
  data: {
    type: Object,
    required: false,
  },
  demo_mode: {
    type: Boolean,
    default: false,
  },
})

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

const restaurant = props.data ?? (await restaurantStore.get(props.id, true))
const search_query = ref('')
const menu = computed(() =>
  restaurant.menu.filter(d => d.name.toLowerCase().includes(search_query.value.toLowerCase()))
)
</script>

<template>
  <OnlyMobile
    :ignore="
      true //props.demo_mode
    "
  >
    <!-- Si no encierro el componente en este <div> el header no se queda pegado arriba,
    ni idea de por qué pasa eso o si debería pasar. Tengo que mirarlo después -->
    <div>
      <div class="max-h-[25vh] w-full overflow-hidden">
        <img :src="restaurant.banner" />
      </div>
      <header class="sticky top-0 z-10 flex flex-col justify-center gap-2 bg-white p-2">
        <div class="flex w-full flex-col px-4">
          <h1 class="text-3xl font-bold">
            {{ restaurant.name }}
          </h1>
          <span class="flex items-center gap-1 text-sm text-gray">
            <Geo class="h-3.5 w-3.5 color-gray" />
            {{ restaurant.address }}
          </span>
        </div>
        <div class="inline-flex rounded-lg bg-white shadow">
          <Loupe class="mx-3 h-4 w-4 self-center color-gray" />
          <input
            v-model="search_query"
            class="flex-1 bg-white py-2 placeholder:text-sm placeholder:text-gray focus:outline-none"
            placeholder="Toca acá para buscar platos por su nombre"
          />
          <button @click="() => (search_query = '')">
            <Cross class="mx-3 h-4 w-4 color-gray" />
          </button>
        </div>
      </header>

      <div class="flex flex-col gap-2 bg-white p-2">
        <template
          v-for="category in restaurant.categories"
          :key="category"
        >
          <h2
            v-show="
              menu // Que exista 1 platillo de esa categoría
                .flatMap(d => d.categories)
                .includes(category)
            "
            class="px-4 text-left text-lg font-bold capitalize"
          >
            {{ category }}
          </h2>
          <button
            v-for="dish in restaurant.menu
              .filter(d => d.categories.includes(category))
              .sort((d1, d2) => d1.name.toLowerCase().localeCompare(d2.name.toLowerCase()))"
            :key="dish.id"
            v-show="
              menu // Que el platillo exista en el menú filtrado
                .map(d => d.id)
                .includes(dish.id)
            "
            @click="cartStore.push('fukusuke', dish.id)"
            class="card gap-x-1 rounded-lg bg-white p-2 pl-4 shadow"
          >
            <h3 class="card-title text-left font-medium text-black">
              {{ dish.name }}
            </h3>
            <span class="card-sub text-left text-sm text-black">
              <span class="inline-flex items-center gap-0.5">
                <Price class="h-3.5 w-3.5 color-gray" />
                {{ dish.price }}
              </span>
            </span>
            <p class="card-para h-full text-left text-sm text-gray">
              {{ dish.description }}
            </p>
            <img
              class="card-photo h-28 w-28 rounded-lg"
              loading="lazy"
              :src="dish.image"
            />
            <div
              v-if="dish.tags.length"
              class="card-span flex flex-wrap gap-1"
            >
              <span
                v-for="tag in dish.tags"
                :key="tag"
                class="place-self-center whitespace-nowrap rounded-lg border-solid px-2 py-1 text-xs font-bold uppercase leading-3"
                :class="tags[tag]"
              >
                {{ tag }}
              </span>
            </div>
          </button>
        </template>
        <div class="text-center text-sm">© 2023</div>
        <div
          v-show="cartStore.cart[props.id]?.length"
          class="h-14"
        />
      </div>
    </div>

    <button
      v-show="!demo_mode && cartStore.cart[props.id]?.length"
      @click="() => open()"
      class="fixed bottom-0 z-10 m-[0.5rem] flex h-14 w-[calc(100%_-_2*0.5rem)] items-center justify-center rounded-lg bg-black font-medium text-white"
    >
      <div class="h-[--line-height] overflow-hidden">
        <ul class="infinity-scroll text-right">
          <li>Pedir ({{ cartStore.count(props.id) }} plato{{ cartStore.count(props.id).value > 1 ? 's' : '' }})</li>
          <li>Modificar pedido</li>
          <li>Pedir ({{ cartStore.count(props.id) }} plato{{ cartStore.count(props.id).value > 1 ? 's' : '' }})</li>
        </ul>
      </div>
      &nbsp;• CLP
      {{
        cartStore.cart[props.id]?.reduce(
          (count, dish) => count + restaurant.menu.find(d => d.id == dish.id).price * dish.quantity,
          0
        ) ?? 0
      }}
    </button>
  </OnlyMobile>
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
