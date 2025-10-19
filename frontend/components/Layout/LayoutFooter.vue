<template>
    <footer class="bg-gray-800 text-center text-gray-500 p-4">
        &copy; {{ currentYear }} 
        <a target="_blank" href="https://github.com/austinxewell">AuEwellify</a> - 
        <a target="_blank" href="https://github.com/austinxewell/planning-poker">Planning Poker</a>
    </footer>
</template>

<script setup lang='ts'>
const currentYear =  computed(() => new Date().getFullYear())
</script>