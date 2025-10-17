<template>
  <UApp>
    <!-- Wrap the layout and page inside the provider/slot context -->
    <NuxtLayout> 
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

<script setup>
// No top-level reactive state here
</script>

<style>
@import "tailwindcss";
</style>
