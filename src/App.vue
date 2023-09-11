<script setup>
import { ModalsContainer } from 'vue-final-modal'
</script>

<template>
  <div class="text-center selection:bg-green-100">
    <Suspense>
      <router-view />
    </Suspense>
    <ModalsContainer />
  </div>
</template>

<style></style>
