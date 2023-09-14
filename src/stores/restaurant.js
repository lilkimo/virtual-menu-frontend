import {computed} from 'vue'

import {defineStore} from 'pinia'

import menu from '../assets/carta.json'
import api from '@/api.js'

// ¿Esto es legal?
const restaurants = {}

export const useRestaurantStore = defineStore('restaurant', () => {
  async function get(restaurant, force = false) {
    if (force || restaurants[restaurant] == null) {
      restaurants[restaurant] = await api.get(`/restaurant/${restaurant}`)
    }
    return restaurants[restaurant]
  }

  return {get}
})
