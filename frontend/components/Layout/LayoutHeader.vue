<template>
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
</template>

<script setup>
const smallLogo = '/images/small-logo.png'
const textLogo = '/images/text-logo.png'
</script>