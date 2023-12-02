<script setup>
import {ref, computed} from 'vue'

import {v4 as uuid4} from 'uuid'
import QRCode from 'qrcode'

import Image from '@/assets/icons/gallery-export.vue'
import Warning from '@/assets/icons/info-circle.vue'

import MenuEditor from '@/views/MenuEditor.vue'

import {useRestaurantStore} from '@/stores/restaurant'

const new_link = ref(null)
const display_new_link = ref(false)
const input_banner = ref(null)

const restaurant_store = useRestaurantStore()

const restaurant_data = ref(await restaurant_store.get('fukusuke'))

const links = computed(() =>
  restaurant_data.value.links.map(link => ({
    id: uuid4(),
    value: link,
  }))
)

const qr = await QRCode.toDataURL(`http://192.168.18.3:3000/restaurant/${restaurant_data.restaurant_id}`, {
  margin: 0,
  width: 250,
})
</script>
<template>
  <div class="panel">
    <article class="data">
      <header class="flex items-center gap-4 bg-gray-50">
        <h2 class="flex-1">Datos del restaurante</h2>
        <!-- <span class="text-sm">Tienes cambios sin guardar.</span> -->
        <span class="text-sm">Se han guardado los cambios.</span>
        <button class="bg-gray-100">Cancelar</button>
        <button class="bg-black font-medium text-white">Guardar</button>
      </header>
      <!-- px-9 py-6 -->
      <section class="grid grid-cols-2 gap-9 px-9 py-6">
        <div class="flex flex-col">
          <label class="">Nombre</label>
          <input :value="restaurant_data.name" />
          <label class="mt-5">Dirección</label>
          <input :value="restaurant_data.address" />
        </div>
        <div class="flex flex-col gap-1">
          <label class="!mb-0">Links</label>
          <input
            v-for="link in links"
            :key="link.id"
            class="text-blue"
            :value="link.value"
            @change="
              e => {
                const index = links.findIndex(l => link.id == l.id)
                if (e.target.value.length) {
                  restaurant_data.links[index] = e.target.value
                } else {
                  restaurant_data.links.splice(index, 1)
                }
              }
            "
          />
          <button
            v-show="!display_new_link"
            class="bg-gray-100"
            @click="() => (display_new_link = true)"
          >
            Agregar un nuevo link
          </button>
          <input
            v-show="display_new_link"
            ref="new_link"
            class="px-3 py-2 placeholder:font-light placeholder:italic placeholder:text-black"
            placeholder="https://www.instagram.com/restaurante"
            @change="
              e => {
                if (e.target.value.length) {
                  restaurant_data.links.push(e.target.value)
                  new_link.value = ''
                  display_new_link = false
                }
              }
            "
          />
        </div>
      </section>
    </article>
    <article class="banner flex flex-col">
      <header class="flex items-center gap-4 bg-gray-50">
        <h2 class="flex-1">Portada del restaurante</h2>
        <!-- <span class="text-sm">Tienes cambios sin guardar.</span> -->
        <span class="text-sm">Se han guardado los cambios.</span>
        <button class="bg-gray-100">Cancelar</button>
        <button class="bg-black font-medium text-white">Guardar</button>
      </header>
      <section
        class="mx-6 mt-4 flex flex-1 items-center justify-center rounded-md border-2 border-dashed border-gray-100"
      >
        <p class="leading-7 text-gray">
          <Image class="inline-block h-7 w-7 align-bottom color-gray" />
          Arrastra una imagen hasta aquí o
          <input
            ref="input_banner"
            type="file"
            class="hidden"
          />
          <a
            class="text-blue hover:cursor-pointer hover:underline"
            type="file"
            @click="() => input_banner.click()"
          >
            sube un archivo
          </a>
        </p>
      </section>
      <footer class="flex justify-between text-xs text-gray">
        <span>Archivos soportados: JPEG, PNG, WEBP</span>
        <span>Tamaño máximo: 5MB</span>
      </footer>
    </article>
    <article class="qr">
      <header class="flex h-[4.5rem] items-center bg-gray-50">
        <h2>Código QR</h2>
      </header>
      <section>
        <img
          class="w-full"
          :src="qr"
        />
        <footer class="mt-4 text-xs">
          <Warning class="inline-block h-4 w-4 align-text-bottom color-black" />
          Corresponde a la última versión <b>aprobada</b> de la carta.
        </footer>
      </section>
    </article>
    <article class="menu h-min">
      <header class="flex items-center gap-4 bg-gray-50">
        <h2 class="flex-1">Menú del restaurante</h2>
        <!-- <span class="text-sm">Tienes cambios sin guardar.</span> -->
        <span class="text-sm">Se han guardado los cambios.</span>
        <button class="bg-black font-medium text-white">Agregar un platillo</button>
      </header>
      <MenuEditor :restaurant_id="restaurant_data.restaurant_id" />
    </article>
  </div>
</template>

<style scoped>
@import '@/dashboard.css';
.panel {
  display: grid;
  grid-template-columns: minmax(13rem, 1fr) 13rem;
  grid-template-rows: auto auto 1fr;
  grid-auto-columns: 1fr;
  gap: 1rem;
  grid-auto-flow: row;
  grid-template-areas:
    'data data'
    'banner qr'
    'menu menu';
}

.banner {
  grid-area: banner;
}

.qr {
  grid-area: qr;
}

.menu {
  grid-area: menu;
}

.data {
  grid-area: data;
}
</style>
