<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";

import api from "../api";
import menu from "../assets/carta.json";

const route = useRoute();
const data = ref(menu.restaurants[0]); //api.get(`/${route.params.id}`))

const tags = {
  vegano: "text-[#17ad17] border-[#17ad17] bg-[#eefdee]",
  vegetariano: "text-[#17ad17] border-[#17ad17] bg-[#eefdee]", //['#32cd32', '#c0f0c0'],
  camarón: "text-[#ff8989] border-[#ff8989] bg-[#fdeded]", //['#32cd32', '#c0f0c0'],
  "sin gluten": "text-[#f8c52b] border-[#f8c52b] bg-[#fef9e9]", //['#32cd32', '#c0f0c0'],
  "sin lactosa": "text-[#6039da] border-[#6039da] bg-[#f2eefc]", //['#32cd32', '#c0f0c0'],
};
</script>

<template>
  <div>
    <div class="sticky top-0 z-10 grid h-24 grid-cols-2 bg-[#79f]">
      <div class="flex items-center justify-end">
        <img src="../assets/sushi.png" />
      </div>
      <div class="flex items-center">
        <div>
          <h1 class="text-center text-[#FAF1E4]">{{ data.name }}</h1>
          <h2 class="text-center text-[#FAF1E4]">Sushi-Delivery</h2>
        </div>
      </div>
    </div>

    <div class="bg-background p-2">
      <span
        v-for="dish in data.menu"
        class="mb-2 grid grid-cols-12 rounded-lg bg-background p-2 drop-shadow-lg"
      >
        <img class="col-start-1 col-end-5" src="../assets/Nigiri Sake.png" />
        <div class="col-start-5 col-end-13 flex flex-col">
          <span class="text-left text-xl font-bold text-text">
            {{ dish.name }}
          </span>
          <span class="h-full text-left leading-4 text-text">
            {{ dish.description }}
          </span>
          <span class="flex flex-row-reverse justify-between gap-1">
            <span class="text-left text-xl font-bold text-text">
              ${{ dish.price }}
            </span>
            <div class="inline-flex flex-wrap gap-1">
              <span
                v-for="tag in dish.tags"
                class="place-self-center whitespace-nowrap rounded-full border-2 border-solid px-[.375rem] py-[.125rem] font-PTSansNarrow text-xs uppercase leading-3"
                :class="tags[tag]"
              >
                {{ tag }}
              </span>
            </div>
          </span>
        </div>
      </span>
    </div>
  </div>
</template>

<style scoped></style>
