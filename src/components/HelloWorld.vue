<script setup>
import {ref} from 'vue'

import {useRoute} from 'vue-router'

import api from '../api'
import menu from '../assets/carta.json'

const route = useRoute()
const data = ref(menu.restaurants[0]) //api.get(`/${route.params.id}`))
</script>

<template>
  <h1 class="bg-clip-text text-2xl font-black">
    <span
      style="
        display: block;
        max-width: 90%;
        border: 1px solid gray;
        margin: 10px auto 10px;
        padding: 10px;
        line-height: 1.5;
        border-radius: 10px;
      "
    >
      <span style="color: rgb(23, 23, 23)">id orden:</span> <br />
      nombre: <br />
      numero: <br />
      dirrecion: <br />
    </span>

    <span
      v-for="dish in data.menu"
      style="
        display: block;
        max-width: 90%;
        border: 1px solid gray;
        margin: 0 auto 10px;
        padding: 10px;
        line-height: 1;
        text-align: center;
        border-radius: 10px;
      "
    >
      <h1 style="font-size: 90%; color: rgb(34, 34, 34); text-align: left">
        {{ dish.name }}
      </h1>
      <table style="width: 100%">
        <tr>
          <td style="width: 20%">
            <img
              src="https://www.yamakisushi.cl/wp-content/uploads/2020/07/VR4205.png"
              style="border-radius: 20px"
            />
          </td>
          <td style="text-align: left; vertical-align: top">
            <h1>comentarios</h1>
          </td>
        </tr>
      </table>
      <h1 style="vertical-align: bottom; font-size: 90%; color: rgb(34, 34, 34); text-align: left">Cantidad: 1</h1>
    </span>
  </h1>
</template>

<style scoped></style>
