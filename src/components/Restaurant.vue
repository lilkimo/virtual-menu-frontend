<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";

import api from "../api";
import menu from "../assets/carta.json";

const route = useRoute();
const data = ref(menu.restaurants[0]); //api.get(`/${route.params.id}`))
</script>

<template>
  <div>
    <div class="grid h-24 grid-cols-2 bg-[#A73121]">
      <div>
        <img src="../assets/sushi.png" />
      </div>
      <div>
        <h1 class="text-center text-[#FAF1E4]">{{ data.name }}</h1>
        <h2 class="text-center text-[#FAF1E4]">Sushi-Delivery</h2>
      </div>
    </div>

    <div class="bg-[#fcf7f1] p-6">
      <span
        v-for="dish in data.menu"
        class="mb-3 grid grid-cols-12 rounded-lg bg-[#fcf7f1] p-3 drop-shadow-lg"
      >
        <img class="col-start-1 col-end-5" src="../assets/Nigiri Sake.png" />
        <div class="col-start-5 col-end-13 flex flex-col">
          <span class="text-left text-xl font-bold text-[#862B0D]">
            {{ dish.name }}
          </span>
          <span class="text-left leading-4 text-[#C56545]">
            {{ dish.description }}
          </span>
          <span class="flex flex-row-reverse justify-between">
            <span class="text-left text-xl font-bold text-[#862B0D]">
              ${{ dish.price }}
            </span>
            <span
              v-for="tag in dish.tags"
              class="my-1 place-self-center rounded-full border-2 border-solid border-[#862B0D] px-2 text-xs lowercase leading-3 text-[#862B0D]"
            >
              {{ tag }}
            </span>
          </span>
        </div>
      </span>
    </div>
  </div>
</template>

<style scoped></style>
