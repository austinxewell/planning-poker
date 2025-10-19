<template>
    <div class="relative flex justify-center items-center w-full mb-14 overflow-visible pb-4">
        <div class="absolute flex justify-center items-center pointer-events-none z-0">
            <div class="absolute w-28 h-44 bg-modal border-2 border-cardBorder rounded-lg shadow-xl transform -rotate-12 -translate-x-24 opacity-50"/>
            <div class="absolute w-28 h-44 bg-modal border-2 border-cardBorder rounded-lg shadow-xl transform -rotate-6 -translate-x-12 opacity-60"/>
            <div class="absolute w-28 h-44 bg-modal border-2 border-cardBorder rounded-lg shadow-xl opacity-70"/>
            <div class="absolute w-28 h-44 bg-modal border-2 border-cardBorder rounded-lg shadow-xl transform rotate-6 translate-x-12 opacity-80"/>
            <div class="absolute w-28 h-44 bg-modal border-2 border-cardBorder rounded-xl shadow-xl transform rotate-12 translate-x-24 opacity-90"/>
        </div>

        <h1
            class="text-5xl sm:text-6xl font-extrabold text-center relative z-20
            leading-[1.2] sm:leading-[1.25]"
            :class="{
                'text-primary-light drop-shadow-[0_0_8px_rgb(207,133,0)]': !isDark, // solid blue + gold glow
                'bg-clip-text text-transparent drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)]': isDark // gradient in dark
            }"
            :style="isDark
                ? 'background-image: linear-gradient(to right, rgb(var(--color-primary-from)), rgb(var(--color-primary-to)))'
                : ''"
        >
            Planning Poker
        </h1>
    </div>
</template>

<script setup lang="ts">
const colorMode = useColorMode()
const isDark = computed(() => colorMode.value === 'dark')
</script>
