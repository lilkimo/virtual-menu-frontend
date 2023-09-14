<script setup>
const props = defineProps(['fill'])
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="1 -7 10 10"
  >
    <path
      d="M 2 -7 L 6 -3 L 10 -7 L 11 -6 L 7 -2 L 11 2 L 10 3 L 6 -1 L 2 3 L 1 2 L 5 -2 L 1 -6 L 2 -7"
      :fill="fill"
    />
  </svg>
</template>
