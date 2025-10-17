<template>
    <div class="flex flex-col min-h-screen">
        <!-- Header -->
        <header class="bg-gray-800 text-white p-4 flex items-center gap-2">
            <img
                class="w-14 h-14"
                :src="smallLogo"
                alt="Small Logo"
            />
            <img
                class="h-8 sm:hidden lg:block"
                :src="textLogo"
                alt="Text Logo"
            />
        </header>

        <!-- Main content -->
        <main class="flex-1 overflow-y-auto p-6">
            <slot /> <!-- NuxtPage content goes here -->
        </main>

        <!-- Footer -->
        <footer class="bg-gray-800 text-center text-gray-500 p-4">
            &copy; {{ currentYear }} 
            <a target="_blank" href="https://github.com/austinxewell">AuEwellify</a> - 
            <a target="_blank" href="https://github.com/austinxewell/planning-poker">Planning Poker</a>
        </footer>
    </div>
</template>

<script setup>
const smallLogo = '/images/small-logo.png'
const textLogo = '/images/text-logo.png'
const currentYear =  computed(() => new Date().getFullYear())
</script>