<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import "../index.css";
import api from "../api";
import reporte from "../assets/reporte_ventas.json";

const route = useRoute();
const dataP1 = ref(reporte.reporteVentasPeriodo1);
const dataP2 = ref(reporte.reporteVentasPeriodo2); //api.get(`/${route.params.id}`))
const tituloPeriodo1 = ref(reporte.titulo1);
const tituloPeriodo2 = ref(reporte.titulo2);
</script>

<template>
  <h1>
    <!--<span v-for="elem in data">
      {{ elem }}
    </span>-->
  </h1>
  <div id="periodo1" class="p-5">
    <div class="rounded-md bg-fukusuke-card p-8">
      <h1 class="text-2xl font-bold text-fukusuke-color">
        {{ tituloPeriodo1 }}
      </h1>
      <div class="flex flex-col justify-items-start rounded-md pt-6">
        <div
          class="flex flex-col pt-6 text-left text-sm"
          v-for="elem in dataP1"
        >
          <p class="text-center text-lg font-bold text-fukusuke-texto-card">
            {{ elem.title }}
          </p>
          <p class="pt-3 text-center text-lg font-bold text-fukusuke-color">
            {{ elem.value }}
          </p>
        </div>
      </div>
    </div>
  </div>
  <div id="periodo2" class="p-5">
    <div class="rounded-md bg-fukusuke-card p-8">
      <h1 class="text-2xl font-bold text-fukusuke-color">
        {{ tituloPeriodo2 }}
      </h1>
      <div class="flex flex-col justify-items-start rounded-md pt-6">
        <div
          class="flex flex-col pt-6 text-left text-sm"
          v-for="elem in dataP2"
        >
          <p class="text-center text-lg font-bold text-fukusuke-texto-card">
            {{ elem.title }}
          </p>
          <p class="pt-3 text-center text-lg font-bold text-fukusuke-color">
            {{ elem.value }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
