<script setup>
import { ModalsContainer } from 'vue-final-modal'
</script>

<template>
  <div class="text-center selection:bg-green-100">
    <Suspense>
      <router-view />
    </Suspense>
    <Suspense>
      <ModalsContainer />
    </Suspense>
  </div>
</template>

<style></style>
