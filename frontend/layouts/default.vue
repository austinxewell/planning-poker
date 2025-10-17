<template>
  <div>
    <!-- You can add global layout elements like header/footer here -->
    <header class="bg-gray-800 text-white p-4">
      <h1 class="text-xl font-bold">AuEwellify Planning Poker</h1>
    </header>

    <main class="p-6">
      <slot /> <!-- NuxtPage content goes here -->
    </main>

    <footer class="text-center text-gray-500 mt-6">
      &copy; 2025 Planning Poker
    </footer>
  </div>
</template>

<script setup>
// No top-level browser code here
</script>
