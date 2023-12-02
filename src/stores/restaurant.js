import {defineStore} from 'pinia'

import api from '@/api.js'

// ¿Esto es legal?
const restaurants = {}

export const useRestaurantStore = defineStore('restaurant', () => {
  async function get(restaurant, force = false) {
    if (force || restaurants[restaurant] == null) {
      restaurants[restaurant] = await api.get(`/restaurant/${restaurant}`)
    }
    return Object.assign({}, restaurants[restaurant])
  }

  return {get}
})
