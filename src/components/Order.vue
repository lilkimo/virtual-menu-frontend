<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import { useRestaurantStore } from "../stores/restaurant";
import QRCode from "qrcode";

import api from "../api.js";

const route = useRoute();
const restaurantStore = useRestaurantStore();

const restaurant = restaurantStore.get("Fukusuke");
const data = await api.get(`/order/${route.params.id}`);

const qr = await QRCode.toDataURL(`http://localhost:3000/order/${data.id}`, {
  margin: 0,
  width: 250,
});
</script>

<template>
  <div class="flex flex-col gap-2 p-2">
    <h2 class="px-2 text-left text-xl font-medium capitalize">
      Orden • {{ restaurant.name }}
    </h2>
    <div class="w-full px-2 text-left text-[0.625rem] text-[rgb(56,55,59)]">
      Orden {{ data.id }}
      <br />
      Generada el {{ data.created_at }}
    </div>
    <img :src="qr" class="w-3/4 self-center" />
    <h2 class="text-xl font-medium">¡Llama a un Mesero!</h2>
    <p class="leading-5">
      El restaurante <b class="font-medium">{{ restaurant.name }}</b>
      <u>aún no ha recibido tu orden</u>. Llama a un Mesero y pídele que escanee
      este código QR.
    </p>
    <h2 class="px-2 text-left text-xl font-medium">Detalle</h2>
    <div
      v-for="dish in data.dishes"
      :key="dish.id"
      class="flex flex-col gap-2 rounded-lg bg-background p-2 drop-shadow-lg"
    >
      <div class="flex">
        <div class="w-[calc(100%-3.5rem)] text-left">
          <h2 class="flex flex-col font-medium">
            {{ restaurant.menu.find((d) => d.id == dish.id).name }}
            <span class="text-[0.625rem] font-normal text-[rgb(56,55,59)]">
              {{ dish.id }}
            </span>
          </h2>
          <p v-if="dish.note" class="break-words text-sm text-[rgb(56,55,59)]">
            <b class="font-medium">Instrucciones adicionales</b>:
            {{ dish.note }}
          </p>
        </div>
        <img class="h-14 w-14 rounded-lg" src="../assets/suchi.png" />
      </div>
      <span class="flex justify-between text-lg">
        <span class="text-lg font-medium"> Cantidad: {{ dish.quantity }} </span>
        <span class="text-text">
          CLP {{ restaurant.menu.find((d) => d.id == dish.id).price }}
        </span>
      </span>
    </div>
    <span class="flex justify-between px-2 text-xl font-medium text-text">
      <span> Total </span>
      <span>
        CLP
        {{
          data.dishes.reduce(
            (count, dish) =>
              count +
              restaurant.menu.find((d) => d.id == dish.id).price *
                dish.quantity,
            0
          ) ?? 0
        }}
      </span>
    </span>
    <div class="text-sm">© 2023 Makenki Tanaki, Inc.</div>
  </div>
</template>

<style scoped></style>
