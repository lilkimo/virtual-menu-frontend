<script setup></script>

<template>
  <div class="text-center selection:bg-green-100">
    <img class="mx-auto mb-8 mt-12" alt="Vue logo" src="./assets/logo.png" />
    <Suspense>
      <router-view />
    </Suspense>
    <img
      class="mx-auto my-8"
      alt="powered-by"
      src="./assets/powered-by-vitawind-bright.png"
    />
  </div>
</template>

<style></style>
