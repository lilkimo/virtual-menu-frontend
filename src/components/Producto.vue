<script setup>
import { defineProps, defineEmits, ref } from "vue";

const props = defineProps({
  id: Number,
  nombre: String,
  descripcion: String,
  precio: Number,
  stock: Number,
});

const emit = defineEmits(["deleteProduct", "saveProduct"]);

const isEditing = ref(false);

// Create local data properties for editing
const editedNombre = ref(props.nombre);
const editedDescripcion = ref(props.descripcion);
const editedPrecio = ref(props.precio);
const editedStock = ref(props.stock);

function deleteButtonClick() {
  console.log("Delete button clicked. Emitting event with ID:", props.id);
  emit("deleteProduct", props.id);
}

function editButtonClick() {
  isEditing.value = !isEditing.value;
}

function saveChanges() {
  isEditing.value = false;

  // Emit an event to notify the parent component of the changes
  emit("saveProduct", {
    id: props.id,
    nombre: editedNombre.value,
    descripcion: editedDescripcion.value,
    precio: editedPrecio.value,
    stock: editedStock.value,
  });
}
</script>

<template>
  <!-- ... -->
  <tr :class="{ 'row-editing': isEditing }">
    <th class="flex gap-3 px-6 py-4 font-normal text-gray-900">
      <div class="text-sm">
        <div class="font-medium text-[#374151]">
          <span>{{ props.id }}</span>
        </div>
      </div>
    </th>
    <td class="cell-width-3 px-6 py-4">
      <div class="text-sm">
        <div class="font-medium text-[#374151]">
          <span v-if="!isEditing">{{ props.nombre }}</span>
          <input
            v-else
            v-model="editedNombre"
            class="transparent-input w-full"
            @keydown.enter="saveChanges"
          />
        </div>
      </div>
    </td>

    <td class="cell-width px-6 py-4">
      <div v-if="!isEditing">{{ props.descripcion }}</div>
      <textarea
        v-else
        v-model="editedDescripcion"
        class="transparent-input w-full"
        @keydown.enter="saveChanges"
      ></textarea>
    </td>
    <td class="cell-width-2 px-6 py-4">
      <div v-if="!isEditing">{{ props.precio }}</div>
      <input
        v-else
        v-model.number="editedPrecio"
        class="transparent-input w-full"
        @keydown.enter="saveChanges"
      />
    </td>
    <td class="cell-width-2 px-6 py-4">
      <div v-if="!isEditing">{{ props.stock }}</div>
      <input
        v-else
        v-model.number="editedStock"
        class="transparent-input w-full"
        @keydown.enter="saveChanges"
      />
    </td>
    <td class="px-6 py-4">
      <div class="flex justify-end gap-4">
        <a
          x-data="{ tooltip: 'Delete' }"
          href="#"
          @click.prevent="deleteButtonClick"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="h-6 w-6"
            x-tooltip="tooltip"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
        </a>
        <a
          x-data="{ tooltip: 'Edit' }"
          href="#"
          @click.prevent="editButtonClick"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="h-6 w-6"
            x-tooltip="tooltip"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
            />
          </svg>
        </a>
      </div>
    </td>
  </tr>
</template>

<style scoped>
.cell-width {
  width: 300px;
  min-width: 100px;
  height: 20px;
}
.cell-width-2 {
  width: 100px;
  min-width: 100px;
}
.cell-width-3 {
  width: 150px;
  min-width: 100px;
}
.row-editing {
  background-color: pink;
}
.transparent-input {
  background-color: transparent;
  overflow-y: hidden;
  max-height: 15px;
}
</style>
