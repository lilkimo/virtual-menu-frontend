<script setup>
import {ref} from 'vue'

import {useRoute} from 'vue-router'

import originalJsonData from '/src/assets/carta.json'
import Producto from '/src/components/Producto.vue'

const jsonData = ref(originalJsonData)
const route = useRoute()
const deleteProduct = productId => {
  console.log('Received deleteProduct event with ID:', productId)
  jsonData.value.restaurants.forEach(restaurant => {
    restaurant.menu = restaurant.menu.filter(product => product.id !== productId)
  })
}
const saveProduct = updatedProduct => {
  console.log('Received saveProduct event with updated data asdasd:', updatedProduct)

  jsonData.value.restaurants.forEach(restaurant => {
    const updatedMenu = restaurant.menu.map(product => {
      if (product.id === updatedProduct.id) {
        return {
          ...product,
          name: updatedProduct.nombre,
          description: updatedProduct.descripcion,
          price: updatedProduct.precio,
          stock: updatedProduct.stock,
        }
      } else {
        return product
      }
    })
    restaurant.menu = updatedMenu
  })
}
const createProduct = () => {
  const selectedRestaurant = jsonData.value.restaurants[0]
  const newProduct = {
    id: selectedRestaurant.menu.length + 1,
    name: 'Nuevo Producto',
    description: 'Descripción del nuevo producto',
    price: 0,
    stock: 0,
  }

  // Assuming you have a selected restaurant, you can add the product to its menu
  jsonData.value.restaurants[0].menu.push(newProduct) // Modify this line as per your actual data structure
}
</script>
<template>
  <div class="flex h-screen">
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div class="border-gray-200 h-full overflow-auto rounded-lg border shadow-md">
        <table class="text-gray-500 w-full border-collapse text-left text-sm">
          <thead class="bg-[#f9fafb]">
            <tr>
              <th
                scope="col"
                class="text-gray-900 px-6 py-4 font-medium"
              >
                ID Producto
              </th>
              <th
                scope="col"
                class="text-gray-900 px-6 py-4 font-medium"
              >
                Nombre
              </th>
              <th
                scope="col"
                class="text-gray-900 px-6 py-4 font-medium"
              >
                Descripcion
              </th>
              <th
                scope="col"
                class="text-gray-900 px-6 py-4 font-medium"
              >
                Precio
              </th>
              <th
                scope="col"
                class="text-gray-900 px-6 py-4 font-medium"
              >
                Stock
              </th>
              <th
                scope="col"
                class="text-gray-900 px-6 py-4 font-medium"
              ></th>
            </tr>
          </thead>
          <tbody class="divide-gray-100 border-gray-100 divide-y border-t">
            <template
              v-for="restaurant in jsonData.restaurants"
              :key="restaurant.name"
            >
              <template
                v-for="product in restaurant.menu"
                :key="product.name"
              >
                <Producto
                  :descripcion="product.description"
                  :nombre="product.name"
                  :precio="product.price"
                  :id="product.id"
                  :stock="product.stock"
                  v-on:deleteProduct="deleteProduct"
                  v-on:saveProduct="saveProduct"
                ></Producto>
              </template>
            </template>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
td {
  max-width: 150px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

textarea {
  max-width: 100%;
  width: 100%;
}
</style>
