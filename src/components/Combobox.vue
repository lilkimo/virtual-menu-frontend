<script setup>
import {ref, computed} from 'vue'
import {Combobox, ComboboxInput, ComboboxOptions, ComboboxOption, ComboboxButton} from '@headlessui/vue'

import {IconSearch, IconCheck, IconPlus} from '@tabler/icons-vue'

const props = defineProps({
  options: {
    type: Array,
    required: true,
  },
  query_option: {
    type: Boolean,
    default: false,
  },
  query_option_placeholder: {
    type: String,
    default: 'Nuevo',
  },
  capitalize: {
    type: Boolean,
    default: false,
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  defaultValue: {
    type: Array,
    default: [],
  },
})

const selected_options = defineModel()
const query = ref('')

const new_option = computed(() => {
  if (
    query.value === '' ||
    props.options.map(option => option.value.toLowerCase()).includes(query.value.toLowerCase().trim())
  ) {
    return null
  } else {
    return {id: null, value: query.value}
  }
})

const filtered_options = computed(() => {
  return query.value === ''
    ? props.options
    : props.options.filter(option => option.value.toLowerCase().includes(query.value.toLowerCase().trim()))
})
</script>

<template>
  <Combobox
    as="div"
    v-model="selected_options"
    :by="(option1, option2) => option1.id == option2.id"
    :multiple="props.multiple"
  >
    <ComboboxButton
      as="div"
      class="relative w-full"
    >
      <ComboboxInput
        class="box w-full py-1.5 !pl-9 outline-none placeholder:font-light placeholder:italic placeholder:text-gray focus:!ring-2 focus:!ring-black"
        @change="e => (query = e.target.value = e.target.value.trimStart().replace(/\s+/g, ' '))"
        :displayValue="() => ''"
        placeholder="Busca aquí..."
      />
      <IconSearch class="pointer-events-none absolute inset-y-0 left-0 my-auto ml-2 h-5 w-5 stroke-1 text-gray" />
    </ComboboxButton>
    <Transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <ComboboxOptions
        class="box absolute z-10 mt-1 bg-white py-1 shadow"
        v-show="props.query_option || filtered_options.length"
      >
        <div class="flex max-h-40 min-w-[12rem] flex-col gap-1 overflow-auto">
          <ComboboxOption
            v-if="props.query_option && new_option"
            class="option select-none hover:bg-black hover:!text-white"
            :class="props.capitalize && 'capitalize'"
            :value="new_option"
          >
            <IconPlus class="h-5 w-5 stroke-1" />
            {{ query_option_placeholder }}
          </ComboboxOption>
          <ComboboxOption
            v-for="option in filtered_options"
            :key="option.id"
            class="option select-none"
            :class="props.capitalize && 'capitalize'"
            :value="option"
            v-slot="{selected}"
          >
            <IconCheck
              class="h-5 w-5 stroke-1"
              :color="!selected && 'transparent'"
            />
            {{ option.value }}
          </ComboboxOption>
        </div>
      </ComboboxOptions>
    </Transition>
  </Combobox>
</template>

<style scoped>
@import '@/dashboard.css';
.box {
  @apply rounded border-0 ring-1 ring-inset ring-gray-100;
}

.option {
  @apply mx-1 flex cursor-pointer items-center gap-2 rounded px-2 py-2 text-sm text-black ui-active:bg-black ui-active:text-white;
}
</style>
