<script setup>
import {ref, computed, watch} from 'vue'
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionRoot,
  TransitionChild,
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue'

import {v4 as uuid4} from 'uuid'

import Pagination from '@/components/Pagination.vue'
import Combobox from '@/components/Combobox.vue'

import {IconPlus, IconPencil, IconX, IconEraser, IconSelector, IconAlertTriangle} from '@tabler/icons-vue'

import tags from '@/tags_styles.js'
import {deep_clone} from '@/utils.js'

const units = ['g', 'kg', 'ml', 'l', 'oz']
const page_size = 12

const recipes = ref([
  {
    recipe_id: 1,
    name: 'Yakitori',
    ingredients: [
      {
        ingredient_id: 1,
        name: 'Arroz',
        quantity: 10,
        unit: 'kg',
      },
      {
        ingredient_id: 2,
        name: 'Sal',
        quantity: 1,
        unit: 'g',
      },
    ],
    tags: ['vegano', 'sin gluten'],
  },
  {
    recipe_id: 2,
    name: 'Gyosas',
    ingredients: [
      {
        ingredient_id: 1,
        name: 'Arroz',
        quantity: 1,
        unit: 'kg',
      },
      {
        ingredient_id: 3,
        name: 'Azucar',
        quantity: 12,
        unit: 'oz',
      },
    ],
    tags: ['vegano', 'sin gluten'],
  },
  /*
  {
    recipe_id: 3,
    name: 'Gyosas',
    ingredients: [
      {ingredient_id: 1, name: 'Arroz', quantity: 1, unit: 'kg'},
      {ingredient_id: 3, name: 'Azucar', quantity: 12, unit: 'oz'},
    ],
    tags: ['vegano', 'sin gluten'],
  },
  {
    recipe_id: 4,
    name: 'Gyosas',
    ingredients: [
      {ingredient_id: 1, name: 'Arroz', quantity: 1, unit: 'kg'},
      {ingredient_id: 3, name: 'Azucar', quantity: 12, unit: 'oz'},
    ],
    tags: ['vegano', 'sin gluten'],
  },
  {
    recipe_id: 5,
    name: 'Gyosas',
    ingredients: [
      {ingredient_id: 1, name: 'Arroz', quantity: 1, unit: 'kg'},
      {ingredient_id: 3, name: 'Azucar', quantity: 12, unit: 'oz'},
    ],
    tags: ['vegano', 'sin gluten'],
  },
  {
    recipe_id: 6,
    name: 'Gyosas',
    ingredients: [
      {ingredient_id: 1, name: 'Arroz', quantity: 1, unit: 'kg'},
      {ingredient_id: 3, name: 'Azucar', quantity: 12, unit: 'oz'},
    ],
    tags: ['vegano', 'sin gluten'],
  },
  {
    recipe_id: 7,
    name: 'Gyosas',
    ingredients: [
      {ingredient_id: 1, name: 'Arroz', quantity: 1, unit: 'kg'},
      {ingredient_id: 3, name: 'Azucar', quantity: 12, unit: 'oz'},
    ],
    tags: ['vegano', 'sin gluten'],
  },
  {
    recipe_id: 8,
    name: 'Gyosas',
    ingredients: [
      {ingredient_id: 1, name: 'Arroz', quantity: 1, unit: 'kg'},
      {ingredient_id: 3, name: 'Azucar', quantity: 12, unit: 'oz'},
    ],
    tags: ['vegano', 'sin gluten'],
  },
  {
    recipe_id: 9,
    name: 'Gyosas',
    ingredients: [
      {ingredient_id: 1, name: 'Arroz', quantity: 1, unit: 'kg'},
      {ingredient_id: 3, name: 'Azucar', quantity: 12, unit: 'oz'},
    ],
    tags: ['vegano', 'sin gluten'],
  },
  {
    recipe_id: 10,
    name: 'Gyosas',
    ingredients: [
      {ingredient_id: 1, name: 'Arroz', quantity: 1, unit: 'kg'},
      {ingredient_id: 3, name: 'Azucar', quantity: 12, unit: 'oz'},
    ],
    tags: ['vegano', 'sin gluten'],
  },
  {
    recipe_id: 11,
    name: 'Gyosas',
    ingredients: [
      {ingredient_id: 1, name: 'Arroz', quantity: 1, unit: 'kg'},
      {ingredient_id: 3, name: 'Azucar', quantity: 12, unit: 'oz'},
    ],
    tags: ['vegano', 'sin gluten'],
  },
  {
    recipe_id: 12,
    name: 'Gyosas',
    ingredients: [
      {ingredient_id: 1, name: 'Arroz', quantity: 1, unit: 'kg'},
      {ingredient_id: 3, name: 'Azucar', quantity: 12, unit: 'oz'},
    ],
    tags: ['vegano', 'sin gluten'],
  },
  {
    recipe_id: 13,
    name: 'Gyosas',
    ingredients: [
      {ingredient_id: 1, name: 'Arroz', quantity: 1, unit: 'kg'},
      {ingredient_id: 3, name: 'Azucar', quantity: 12, unit: 'oz'},
    ],
    tags: ['vegano', 'sin gluten'],
  },
  {
    recipe_id: 14,
    name: 'Gyosas',
    ingredients: [
      {ingredient_id: 1, name: 'Arroz', quantity: 1, unit: 'kg'},
      {ingredient_id: 3, name: 'Azucar', quantity: 12, unit: 'oz'},
    ],
    tags: ['vegano', 'sin gluten'],
  },
  {
    recipe_id: 15,
    name: 'Gyosas',
    ingredients: [
      {ingredient_id: 1, name: 'Arroz', quantity: 1, unit: 'kg'},
      {ingredient_id: 3, name: 'Azucar', quantity: 12, unit: 'oz'},
    ],
    tags: ['vegano', 'sin gluten'],
  },
  {
    recipe_id: 16,
    name: 'Gyosas',
    ingredients: [
      {ingredient_id: 1, name: 'Arroz', quantity: 1, unit: 'kg'},
      {ingredient_id: 3, name: 'Azucar', quantity: 12, unit: 'oz'},
    ],
    tags: ['vegano', 'sin gluten'],
  },
  */
])

const curr_page = ref(1)
const page = computed(() => [
  page_size * (curr_page.value - 1),
  Math.min(page_size * curr_page.value, recipes.value.length),
])

const curr_recipe = ref()

const ingredients = computed(() => {
  const all_ingredients = new Map()
  const all_recipes = [...recipes.value, curr_recipe.value]
  // prettier-ignore
  all_recipes.forEach(recipe =>
    recipe.ingredients.forEach(ingredient =>
      all_ingredients.set(ingredient.ingredient_id, ingredient.name)
    )
  )
  return Array.from(all_ingredients, ([id, value]) => ({id, value}))
})
const selected_ingredients = ref()

const selected_tags = ref([])

function set_name(name) {
  curr_recipe.value.name = name
}
function remove_ingredient(ingredient_id) {
  const ingredient_index = selected_ingredients.value.findIndex(ingredient => ingredient.id == ingredient_id)
  selected_ingredients.value.splice(ingredient_index, 1)
}
function set_quantity(ingredient_id, quantity) {
  curr_recipe.value.ingredients.find(ingredient => ingredient.ingredient_id == ingredient_id).quantity = quantity
}
function set_unit(ingredient_id, unit) {
  curr_recipe.value.ingredients.find(ingredient => ingredient.ingredient_id == ingredient_id).unit = unit
}

watch(
  selected_ingredients,
  selection => {
    selection.forEach(next_ingredient => {
      // Creo los ingredientes nuevos
      if (next_ingredient.id == null) {
        // No me convence del todo hacer un POST a la API y esperar a que responda.
        // Además no creo que sea mucho problema que a veces hayan ingredientes repetidos en la BD
        next_ingredient.id = uuid4() //await api.post('/ingredients/fukusuke').then(r => r.ingredient_id)
      }
      // Agrego los ingredientes nuevos a la receta
      if (!curr_recipe.value.ingredients.map(i => i.ingredient_id).includes(next_ingredient.id)) {
        curr_recipe.value.ingredients.push({
          ingredient_id: next_ingredient.id,
          name: next_ingredient.value,
          quantity: null,
          unit: 'g',
          enabled: true,
        })
      }
    })
    // Cambio <ingredient.enabled> según si el ingrediente está en la selección <selected_ingredients> o no
    curr_recipe.value.ingredients.forEach(prev_ingredient => {
      prev_ingredient.enabled =
        selection.find(next_ingredient => next_ingredient.id == prev_ingredient.ingredient_id) != null
    })
  },
  {deep: true}
)

const is_modal_open = ref(false)
function open_modal(recipe_id) {
  // prettier-ignore
  curr_recipe.value = deep_clone(
    recipes.value.find(recipe => recipe.recipe_id == recipe_id)
    ?? {
      recipe_id: null,
      name: null,
      ingredients: [],
      tags: [],
    }
  )

  selected_ingredients.value = curr_recipe.value.ingredients.map(ri =>
    ingredients.value.find(i => i.id == ri.ingredient_id)
  )
  selected_tags.value = curr_recipe.value.tags.map(tag => ({id: Object.keys(tags).indexOf(tag), value: tag}))

  is_modal_open.value = true
}
const close_modal = () => (is_modal_open.value = false)
async function save_recipe() {
  curr_recipe.value.ingredients = curr_recipe.value.ingredients.filter(ingredient => ingredient.enabled)
  curr_recipe.value.tags = selected_tags.map(tag => tag.value)
  // await api.put('/recipes/fukusuke')
  const index = recipes.value.findIndex(recipe => recipe.recipe_id == curr_recipe.value.recipe_id)
  // Creo que no es necesario hacer un deep clone de curr_recipe ya que en open_modal reemplazo el objeto
  if (index >= 0) {
    recipes.value[index] = curr_recipe.value
  } else {
    recipes.value.push(curr_recipe.value)
  }
}
</script>

<template>
  <article class="flex max-h-full flex-col">
    <header class="flex items-center gap-4 bg-gray-50">
      <h2 class="flex-1">Recetas</h2>

      <span class="text-sm">Se han guardado los cambios.</span>
      <button
        class="flex items-center gap-1 bg-black font-medium text-white"
        @click="open_modal()"
      >
        <IconPlus
          size="20"
          color="var(--white)"
        />
        Agregar una receta
      </button>
    </header>
    <section class="flex flex-col">
      <table class="table-fixed">
        <tr class="border-b border-gray-100">
          <th class="w-0">#</th>
          <th class="w-44">Nombre</th>
          <th class="">Ingredientes</th>
          <th class="max-w-[16rem]">Etiquetas</th>

          <th class="w-0" />
        </tr>
        <tr
          v-for="(recipe, i) in recipes.slice(...page)"
          :key="recipe.recipe_id"
          class="border-b border-gray-100"
        >
          <td class="text-right text-xs text-gray-300">{{ i + page[0] + 1 }}</td>
          <td>{{ recipe.name }}</td>
          <td class="text-center">
            {{
              recipe.ingredients
                .map(ingredient => `${ingredient.name} × ${ingredient.quantity}${ingredient.unit}`)
                .join(', ')
            }}
          </td>
          <td>
            <ul class="taglist">
              <li
                v-for="tag in recipe.tags"
                :key="tag"
                :class="tags[tag]"
                v-text="tag"
              />
            </ul>
          </td>
          <td>
            <button
              class="ring-1 ring-inset ring-gray-100 hover:bg-gray-100"
              @click="open_modal(recipe.recipe_id)"
            >
              <IconPencil class="h-5 w-5 stroke-1 text-gray" />
            </button>
          </td>
        </tr>
      </table>
      <footer class="my-2 flex items-center justify-between">
        <span class="text-sm text-gray">
          Mostrando {{ page[0] + 1 }}-{{ page[1] }} de {{ recipes.length }} recetas
        </span>
        <Pagination
          v-model="curr_page"
          :items_count="recipes.length"
          :page_size="page_size"
        />
      </footer>
    </section>
  </article>

  <TransitionRoot
    :show="is_modal_open"
    as="template"
  >
    <Dialog
      as="div"
      @close="close_modal"
      class="relative z-10"
    >
      <TransitionChild
        as="template"
        enter="duration-100 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4 text-center">
          <TransitionChild
            as="template"
            enter="duration-100 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-[28.5rem] transform overflow-visible rounded-lg bg-white px-6 py-4 text-left align-middle shadow transition-all"
            >
              <DialogTitle
                as="header"
                class="flex items-center justify-between"
              >
                <h2 class="px-3 py-2">Nueva receta</h2>
                <button
                  class="!px-2 ring-0 hover:bg-gray-100"
                  @click="close_modal"
                >
                  <IconX class="h-7 w-7 stroke-1 text-black" />
                </button>
              </DialogTitle>
              <div class="mt-1 flex flex-col gap-1 px-3 py-2">
                <label class="!mb-0">Nombre *</label>
                <input
                  v-model="curr_recipe.name"
                  @change="e => set_name(e.target.value)"
                />
                <p
                  class="text-sm text-red"
                  v-show="!curr_recipe.name?.length"
                >
                  <IconAlertTriangle class="inline-block h-4 w-4 stroke-[1.75] align-text-bottom text-red" />
                  No puedes dejar este campo vacío.
                </p>
                <label class="!mb-0 mt-5">Ingredientes</label>
                <Combobox
                  :options="ingredients"
                  v-model="selected_ingredients"
                  query_option
                  query_option_placeholder="Nuevo ingrediente"
                  multiple
                />
                <ol class="flex flex-col gap-1">
                  <li
                    v-for="(ingredient, i) in curr_recipe.ingredients.filter(ingredient => ingredient.enabled)"
                    :key="ingredient.ingredient_id"
                    class="flex w-full items-center gap-1"
                  >
                    <span
                      class="ml-3 text-right text-xs text-gray-300"
                      :class="curr_recipe.ingredients.length > 9 ? 'w-[2ch]' : 'w-[1ch]'"
                      >{{ i + 1 }}</span
                    >
                    <span class="min-w-0 flex-1 px-3">
                      {{ ingredient.name }}
                    </span>
                    <div class="flex rounded ring-1 ring-inset ring-gray-100">
                      <input
                        class="w-16 rounded-none rounded-l border-r border-gray-100 bg-transparent text-right ring-0 [appearance:textfield] placeholder:overflow-visible focus:border-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                        placeholder="00"
                        type="number"
                        @change="e => set_quantity(ingredient.ingredient_id, e.target.value)"
                        :value="ingredient.quantity"
                      />
                      <Listbox
                        as="div"
                        :defaultValue="ingredient.unit"
                        @update:modelValue="unit => set_unit(ingredient.ingredient_id, unit)"
                        v-slot="{open}"
                      >
                        <ListboxButton
                          class="relative h-full w-[calc(0.75rem_+_2ch_+_2.25rem)] pr-9 ring-inset"
                          :class="open && 'ring-2 ring-black' /* ui-open no funcionaba bien */"
                          v-slot="{value}"
                        >
                          {{ value }}
                          <IconSelector
                            class="pointer-events-none absolute inset-y-0 right-0 my-auto mr-2 h-5 w-5 stroke-1 text-gray"
                          />
                        </ListboxButton>
                        <ListboxOptions
                          class="absolute z-20 mt-1 w-[calc(0.75rem_+_2ch_+_0.75rem)] rounded bg-white py-1 text-center text-sm shadow ring-1 ring-gray-100"
                        >
                          <ListboxOption
                            v-for="unit in units"
                            :key="unit"
                            :value="unit"
                            class="mx-1 cursor-pointer rounded p-2 ui-active:bg-black ui-active:text-white"
                          >
                            {{ unit }}
                          </ListboxOption>
                        </ListboxOptions>
                      </Listbox>
                    </div>
                    <button
                      class="px-2 ring-0 hover:bg-gray-100"
                      @click="remove_ingredient(ingredient.ingredient_id)"
                    >
                      <IconEraser class="h-5 w-5 stroke-1 text-gray" />
                    </button>
                  </li>
                </ol>
                <label class="!mb-0 mt-5">Etiquetas alimentarias</label>
                <Combobox
                  :options="Object.keys(tags).map((tag, i) => ({id: i, value: tag}))"
                  v-model="selected_tags"
                  multiple
                />
                <ul class="taglist !justify-start">
                  <li
                    v-for="tag in selected_tags"
                    :key="tag.id"
                    class="flex !p-0"
                    :class="tags[tag.value]"
                  >
                    <span class="py-1 pl-2">{{ tag.value }}</span>
                    <IconX
                      class="inline-block h-5 w-5 cursor-pointer rounded-lg border-[0.25rem] border-transparent stroke-1 align-top"
                      :class="tags[tag.value]"
                      @click="() => selected_tags.splice(selected_tags.indexOf(tag), 1)"
                    />
                  </li>
                </ul>
              </div>

              <div class="mt-4 flex justify-end gap-4">
                <button
                  class="ring-1 ring-inset ring-gray-100 hover:bg-gray-100"
                  @click="close_modal"
                >
                  Cancelar
                </button>
                <button
                  class="ring-1 ring-inset ring-gray-100 hover:bg-gray-100 disabled:bg-gray-100"
                  :disabled="!curr_recipe.name?.length"
                  @click="save_recipe().then(close_modal)"
                >
                  Guardar
                </button>
                <button
                  class="bg-black text-white"
                  :disabled="!curr_recipe.name?.length"
                  @click="save_recipe().then(close_modal)"
                >
                  Guardar y agregar platillo
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<style scoped>
@import '@/dashboard.css';
</style>
