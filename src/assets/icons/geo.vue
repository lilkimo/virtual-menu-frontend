<script setup>
const props = defineProps(['fill'])
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="2 -7 8 12"
  >
    <path
      d="M 2 -3 C 2 0 5 3 6 5 C 7 3 10 0 10 -3 C 10 -5 8 -7 6 -7 C 4 -7 2 -5 2 -3 M 4 -3 C 4 -4 5 -5 6 -5 C 7 -5 8 -4 8 -3 C 8 -2 7 -1 6 -1 C 5 -1 4 -2 4 -3"
      :fill="fill"
    />
  </svg>
</template>
