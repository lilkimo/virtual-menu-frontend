<script setup>
import {ref} from 'vue'

import {useRoute} from 'vue-router'

import users from '../assets/users.json'

const route = useRoute()
const data = ref(users.users) //api.get(`/${route.params.id}`))
</script>

<template>
  <h1 class="font-bold">Usuarios</h1>
  <span v-for="user in data">
    <div class="mt-4 flex flex-col gap-3">
      <div class="flex flex-row">
        <div class="flex basis-2/3 flex-row rounded-l-lg bg-[#4ade80]">
          <div class="flex basis-2/3 justify-center">{{ user.name }}</div>
          <div
            class="my-1 place-self-center rounded-full border-2 border-solid border-[#000000] px-2 text-xs lowercase leading-3 text-black"
          >
            {{ user.rol }}
          </div>
        </div>
        <div class="flex basis-1/3 flex-row rounded-r-lg bg-[#f87171]">
          <div class="grid min-w-full grid-flow-col grid-rows-1 justify-items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="h-6 w-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="h-6 w-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </span>
</template>

<style scoped></style>
