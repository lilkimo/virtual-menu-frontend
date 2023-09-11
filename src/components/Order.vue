<script setup>
import { ref } from "vue"
import { useRoute } from "vue-router"
import { useRestaurantStore } from '../stores/restaurant'
const restaurantStore = useRestaurantStore()
const restaurant = ref(restaurantStore.get("Fukusuke"))

const route = useRoute()

const data = route.params.id
const orderData = JSON.parse(data)

const getPrice = (price, quantity) => {
  return price*quantity
}
</script>

<template>
  <div>
    <h1 class="font-medium">Orden</h1>
  </div>
  <div v-for="item in orderData" class="mb-2 flex gap-2 rounded-lg bg-background px-4 py-2 drop-shadow-lg w-full">
    <div flex flex-col gap-1>
      <div class="font-medium">{{ restaurant.menu.find(d => d.id == item.id).name }}</div>
      <div class="font-extralight text-xs">{{ restaurant.menu.find(d => d.id == item.id).id }}</div>
      <div class="font-medium">${{ getPrice(item.quantity, restaurant.menu.find(d => d.id == item.id).price) }}</div>
      <div class="font-medium">Cantidad: {{ item.quantity }}</div>
    </div>
    <img
      class="rounded-lg w-28 h-28"
      src="../assets/suchi.png"
    />
  </div>
  <!-- <div>
    <h2 class="font-medium">Total: $</h2>
  </div> -->
</template>


<style scoped>
</style>