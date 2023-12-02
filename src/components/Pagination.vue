<script setup>
import {computed, defineModel} from 'vue'
import {RadioGroup, RadioGroupOption} from '@headlessui/vue'

import {IconChevronLeft, IconChevronRight} from '@tabler/icons-vue'

import {clamp, pagination} from '@/utils.js'

const curr_page = defineModel()
const props = defineProps({
  items_count: {
    type: Number,
    required: true,
  },
  page_size: {
    type: Number,
    required: true,
  },
})

const pages_count = Math.ceil(props.items_count / props.page_size)
const pages = computed(() => {
  return pagination(curr_page, pages_count)
})
</script>

<template>
  <RadioGroup
    as="nav"
    class="inline-grid auto-cols-[1fr] grid-flow-col -space-x-px rounded-md"
    v-model="curr_page"
  >
    <a
      class="!w-auto rounded-l-md !px-2"
      @click="() => (curr_page = clamp(curr_page - 1, 1, pages_count))"
    >
      <IconChevronLeft class="h-5 w-5 text-gray-300" />
    </a>
    <template v-for="page in pages">
      <RadioGroupOption
        v-if="Number.isInteger(page)"
        as="a"
        :value="page"
        v-text="page"
      />
      <a
        v-else
        class="pointer-events-none"
        v-text="page"
      />
    </template>
    <a
      class="!w-auto rounded-r-md !px-2"
      @click="() => (curr_page = clamp(curr_page + 1, 1, pages_count))"
    >
      <IconChevronRight class="h-5 w-5 text-gray-300" />
    </a>
  </RadioGroup>
</template>

<style scoped>
@import '@/dashboard.css';

nav > * {
  @apply relative inline-flex select-none justify-center px-3 py-2 text-sm font-semibold ring-1 ring-inset hover:cursor-pointer focus:outline-offset-0 ui-checked:bg-black ui-checked:text-white ui-checked:ring-black ui-not-checked:text-black ui-not-checked:ring-gray-100 ui-not-checked:hover:bg-gray-100;
}
</style>
