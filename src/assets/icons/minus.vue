<script setup>
const props = defineProps(['fill'])
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 12 2"
  >
    <path
      d="M 0 0 L 0 2 L 12 2 L 12 0 L 0 0"
      :fill="fill"
    />
  </svg>
</template>
