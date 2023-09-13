<script setup>
import {ModalsContainer} from 'vue-final-modal'
</script>

<template>
  <div class="selection:bg-green-100 text-center">
    <Suspense>
      <router-view />
    </Suspense>
    <Suspense>
      <ModalsContainer />
    </Suspense>
  </div>
</template>

<style></style>
