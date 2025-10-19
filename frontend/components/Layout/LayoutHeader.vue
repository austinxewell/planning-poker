<template>
    <header class="bg-gray-800 text-white p-4 flex items-center justify-between">
        <div class=" flex items-center gap-2">
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
        </div>

        <CommonButton
            class="px-4 py-2"
            variant="neutral"
            @click="toggleTheme"
        >
            {{ isDark ? 'Light Mode' : 'Dark Mode' }}
        </CommonButton>
    </header>
</template>

<script setup>
const smallLogo = '/images/small-logo.png'
const textLogo = '/images/text-logo.png'

const colorMode = useColorMode()
const isDark = computed(() => colorMode.value === 'dark')

function toggleTheme() {
    colorMode.preference = isDark.value ? 'light' : 'dark'
}
</script>