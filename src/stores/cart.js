import {reactive, computed} from 'vue'
import {defineStore} from 'pinia'

export const useCartStore = defineStore('cart', () => {
  const cart = reactive({})

  function push(restaurant, item) {
    if (cart[restaurant] == null) cart[restaurant] = []
    const dish = cart[restaurant].find(d => d.id == item)
    if (dish) {
      if (dish.quantity < 99) dish.quantity++
    } else
      cart[restaurant].push({
        id: item,
        quantity: 1,
      })
  }

  function pop(restaurant, item) {
    const dish = cart[restaurant]?.find(d => d.id == item)
    if (!dish) return // falta programar el error

    if (dish.quantity == 1) cart[restaurant] = cart[restaurant].filter(d => d !== dish)
    else dish.quantity--
  }

  const count = restaurant =>
    computed(() =>
      cart[restaurant]?.length ? cart[restaurant].reduce((count, d) => count + d.quantity, 0) : 0
    )

  function addNote(restaurant, item, note) {
    const dish = cart[restaurant]?.find(d => d == item)
    dish.note = note
  }

  return {cart, push, pop, count, addNote}
})
