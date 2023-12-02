<script setup>
import {ref, computed} from 'vue'
import {Disclosure, DisclosureButton, DisclosurePanel, TransitionRoot, TransitionChild} from '@headlessui/vue'

import Edit from '@/assets/icons/edit-2.vue'
import Image from '@/assets/icons/gallery-export.vue'
import Cross from '@/assets/icons/cross-v2.vue'

import Combobox from '@/components/Combobox.vue'

import tags from '@/tags_styles.js'
import {useRestaurantStore} from '@/stores/restaurant'

const props = defineProps({
  restaurant_id: {
    type: String,
    required: true,
  },
})

const restaurant_store = useRestaurantStore()

const restaurant_data = ref(await restaurant_store.get(props.restaurant_id))
const table = ref(null)

const categories = computed(() => {
  const set = new Set()
  restaurant_data.value.menu.forEach(dish => dish.categories.forEach(category => set.add(category)))
  return Array.from(set)
})

const tag_data = {
  tags: ['vegano', 'vegetariano', 'camarón', 'sin gluten', 'sin lactosa'],
}
</script>

<template>
  <table
    ref="table"
    class="mx-6 my-4 w-[calc(100%_-_2*1.5rem)] table-fixed"
  >
    <tr class="border-b border-gray-100">
      <th class="w-[5.5rem]" />
      <th class="w-44">Nombre</th>
      <th>Descripción</th>
      <th class="w-16">Precio</th>
      <th class="w-52">Categorías</th>
      <th class="w-[4.25rem]" />
    </tr>
    <Disclosure
      v-for="dish in restaurant_data.menu"
      v-slot="{open}"
    >
      <tbody
        class="rounded-md"
        :class="open && 'shadow'"
      >
        <tr :class="!open && 'border-b border-gray-100'">
          <td>
            <img
              class="h-16 w-16 rounded"
              :src="dish.image"
            />
          </td>
          <td class="text-sm">
            {{ dish.name }}
          </td>
          <td>
            <p class="line-clamp-2 text-sm">
              {{ dish.description }}
            </p>
          </td>
          <td class="whitespace-nowrap text-left text-sm">
            {{ dish.price }}
          </td>
          <td>
            <ul class="taglist">
              <li
                v-for="category in dish.categories"
                :key="category"
                v-text="category"
              />
            </ul>
          </td>
          <td>
            <DisclosureButton class="block cursor-pointer rounded bg-gray-100 px-3 py-2">
              <Edit class="h-5 w-5 color-black" />
            </DisclosureButton>
          </td>
        </tr>
        <tr>
          <!-- Deuda técnica: No súpe cómo animar el max-height -->
          <Transition
            enter-active-class="transition ease-out duration-100"
            enter-from-class="transform opacity-0 scale-95"
            enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75"
            leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95"
          >
            <DisclosurePanel
              as="td"
              colspan="6"
            >
              <div class="editor overflow-hidden">
                <div class="image">
                  <img
                    class="h-40 w-40 rounded"
                    :src="dish.image"
                  />
                  <button class="flex w-full items-center gap-1 text-center text-gray hover:underline">
                    <Image class="inline-block h-4 w-4 align-bottom color-gray" />
                    Cambiar la foto
                  </button>
                </div>
                <div class="name flex flex-col">
                  <label class="mb-1">Nombre</label>
                  <input
                    class="w-full"
                    :value="dish.name"
                  />
                </div>
                <div class="desc flex flex-col">
                  <label class="mb-1">Descripción</label>
                  <textarea class="flex-1 resize-none">{{ dish.description }}</textarea>
                </div>
                <div class="price flex">
                  <div class="flex flex-col">
                    <label class="mb-1">Precio</label>
                    <input
                      class="w-20 text-right"
                      :value="dish.price"
                    />
                  </div>
                </div>
                <ul class="categ taglist flex">
                  <label class="w-full">Categorías</label>
                  <Combobox
                    class="w-full min-w-[10rem]"
                    :options="categories"
                    query_option
                    capitalize
                    @update:modelValue="
                      category => !dish.categories.includes(category) && dish.categories.push(category)
                    "
                  />
                  <li
                    v-for="category in dish.categories"
                    :key="category"
                    class="flex cursor-pointer gap-1"
                    @click="() => dish.categories.splice(dish.categories.indexOf(category), 1)"
                  >
                    {{ category }}
                    <Cross class="h-3 w-3 color-black" />
                  </li>
                </ul>
                <div class="tags taglist flex">
                  <label class="w-full">Etiquetas</label>
                  <Combobox
                    class="w-full min-w-[10rem]"
                    :options="tag_data.tags"
                    capitalize
                    @update:modelValue="tag => !dish.tags.includes(tag) && dish.tags.push(tag)"
                  />
                  <li
                    v-for="tag in dish.tags"
                    :key="tag"
                    class="flex cursor-pointer gap-1"
                    :class="tags[tag]"
                    @click="() => dish.tags.splice(dish.tags.indexOf(tag), 1)"
                  >
                    {{ tag }}
                    <Cross
                      class="h-3 w-3 cursor-pointer"
                      :class="tags[tag]"
                    />
                  </li>
                </div>
                <div class="save flex flex-row-reverse items-center gap-4">
                  <button
                    class="bg-black font-medium text-white"
                    @click="() => console.log(dish)"
                  >
                    Guardar
                  </button>
                  <button class="bg-gray-100">Cancelar</button>
                  <span class="text-sm">Se han guardado los cambios.</span>
                </div>
              </div>
            </DisclosurePanel>
          </Transition>
        </tr>
      </tbody>
    </Disclosure>
  </table>
</template>

<style scoped>
.editor {
  display: grid;
  grid-template-columns: auto 1.1fr 1fr 1fr;
  grid-template-rows: auto 1fr;
  gap: 1rem 1.5rem;
  grid-auto-flow: row;
  grid-template-areas:
    'image name price price'
    'image desc categ tags'
    'save save save save';
}

.editor > * {
  @apply text-sm;
}

.image {
  grid-area: image;
}

.name {
  grid-area: name;
}

.desc {
  grid-area: desc;
}

.price {
  grid-area: price;
}

.stock {
  grid-area: stock;
}

.tags {
  grid-area: tags;
}

.categ {
  grid-area: categ;
}

.save {
  grid-area: save;
}

img {
  @apply max-w-none;
}

article {
  @apply overflow-hidden rounded-lg bg-white shadow;
}

article > * {
  @apply px-6 py-4;
}

label {
  @apply text-sm text-gray;
}

input {
  @apply rounded border-0 px-2 py-1 ring-1 ring-inset ring-gray-100 placeholder:text-gray focus:text-black focus:ring-2;
}

button {
  @apply rounded px-3 py-2 text-sm;
}

textarea {
  @apply rounded border-0 px-2 py-1 ring-1 ring-inset ring-gray-100 placeholder:text-gray focus:text-black focus:ring-2;
}
</style>
