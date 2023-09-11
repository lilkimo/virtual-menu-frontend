<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import Producto from "/src/components/Producto.vue";
import originalJsonData from "/src/assets/carta.json";

const jsonData = ref(originalJsonData);
const route = useRoute();
const deleteProduct = (productId) => {
  console.log("Received deleteProduct event with ID:", productId);
  jsonData.value.restaurants.forEach((restaurant) => {
    restaurant.menu = restaurant.menu.filter(
      (product) => product.id !== productId
    );
  });
};
const saveProduct = (updatedProduct) => {
  console.log(
    "Received saveProduct event with updated data asdasd:",
    updatedProduct
  );

  jsonData.value.restaurants.forEach((restaurant) => {
    const updatedMenu = restaurant.menu.map((product) => {
      if (product.id === updatedProduct.id) {
        return {
          ...product,
          name: updatedProduct.nombre,
          description: updatedProduct.descripcion,
          price: updatedProduct.precio,
          stock: updatedProduct.stock,
        };
      } else {
        return product;
      }
    });
    restaurant.menu = updatedMenu;
  });
};
const createProduct = () => {
  const selectedRestaurant = jsonData.value.restaurants[0];
  const newProduct = {
    id: selectedRestaurant.menu.length + 1,
    name: "Nuevo Producto",
    description: "Descripción del nuevo producto",
    price: 0,
    stock: 0,
  };

  // Assuming you have a selected restaurant, you can add the product to its menu
  jsonData.value.restaurants[0].menu.push(newProduct); // Modify this line as per your actual data structure
};
</script>
<template>
  <div class="flex h-screen items-center justify-center">
    <div
      class="relative overflow-x-auto bg-transparent shadow-md sm:rounded-lg"
    >
      <div
        class="h-96 overflow-hidden overflow-y-auto rounded-lg border border-gray-200 shadow-md"
      >
        <table
          class="w-full border-collapse bg-white text-left text-sm text-gray-500"
        >
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-4 font-medium text-gray-900">
                ID Producto
              </th>
              <th scope="col" class="px-6 py-4 font-medium text-gray-900">
                Nombre
              </th>
              <th scope="col" class="px-6 py-4 font-medium text-gray-900">
                Descripcion
              </th>
              <th scope="col" class="px-6 py-4 font-medium text-gray-900">
                Precio
              </th>
              <th scope="col" class="px-6 py-4 font-medium text-gray-900">
                Stock
              </th>
              <th scope="col" class="px-6 py-4 font-medium text-gray-900"></th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 border-t border-gray-100">
            <template
              v-for="restaurant in jsonData.restaurants"
              :key="restaurant.name"
            >
              <template v-for="product in restaurant.menu" :key="product.name">
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
    <div class="ml-4 mt-4 flex flex-col items-end justify-end">
      <button
        class="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        @click="createProduct"
      >
        Agregar
      </button>
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
