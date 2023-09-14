<script setup>
import {ModalsContainer} from 'vue-final-modal'
</script>

<template>
  <Suspense>
    <router-view />
  </Suspense>
  <Suspense>
    <ModalsContainer />
  </Suspense>
</template>

<style></style>
