import { computed } from 'vue'
import { defineStore } from 'pinia'

import menu from "../assets/carta.json"

export const useRestaurantStore = defineStore('restaurant', () => {
  const get = restaurant => computed(() => menu.restaurants[0])

  return { get }
})