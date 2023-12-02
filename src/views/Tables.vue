<script setup>
// import '@/dashboard.css'

import {ref, computed} from 'vue'
import {RadioGroup, RadioGroupOption} from '@headlessui/vue'
import {IconUsers} from '@tabler/icons-vue'

const _tables = ref([
  {
    name: 'Mesa número 14',
    group: 'Terraza',
    state: 'available',
    last_update: 1,
    max_seats: 6,
  },
  {
    name: 'Mesa número 31',
    group: 'Piso 1',
    state: 'unavailable',
    last_update: 1,
    max_seats: 4,
  },
  {
    name: 'Mesa número 57',
    group: 'Terraza',
    state: 'available',
    last_update: 1,
    max_seats: 1,
  },
])

const groups = computed(() => {
  const groups = new Map()
  _tables.value.forEach(table => {
    if (!groups.has(table.group)) {
      groups.set(table.group, [])
    }
    groups.get(table.group).push(table)
  })
  return groups
})

const selected_table = ref(null)
</script>

<template>
  <article class="view h-full">
    <header class="header flex items-center gap-4 bg-gray-50">
      <h2 class="flex-1">Mesas</h2>
    </header>
    <RadioGroup
      v-model="selected_table"
      as="div"
      class="navbar flex w-80 flex-col gap-1"
    >
      <template v-for="[group, tables] in groups">
        <span class="ml-3 text-sm text-gray">{{ group }}</span>
        <RadioGroupOption
          v-for="table in tables"
          class="z-10 flex cursor-pointer select-none flex-col rounded px-3 py-2 ring-1 ring-inset ring-gray-100 hover:bg-gray-100 ui-checked:bg-black ui-checked:text-white ui-checked:ring-0"
          :value="table"
        >
          <span
            class="flex justify-between text-sm font-medium"
            :class="table.state == 'available' ? 'text-green' : 'text-red'"
          >
            {{ table.state == 'available' ? 'disponible' : 'en curso' }}
            <span class="inline-flex items-center gap-1 font-normal text-gray ui-checked:text-white">
              <IconUsers class="h-3.5 w-3.5 stroke-1" />
              {{ table.max_seats }}
            </span>
          </span>
          <span class="">{{ table.name }}</span>
        </RadioGroupOption>
      </template>
    </RadioGroup>
    <div class="content">AAA</div>
  </article>
</template>

<style scoped>
@import '@/dashboard.css';

.view {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto 1fr;
  grid-auto-flow: row;
  grid-template-areas:
    'header header'
    'navbar cont';
}

.header {
  grid-area: header;
}

.navbar {
  grid-area: navbar;
}

.content {
  grid-area: cont;
}
</style>
