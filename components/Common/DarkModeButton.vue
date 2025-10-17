<template>
    <button
        v-if="ready"
        class="hover:cursor-pointer"
        @click="toggleDarkMode"
    >
        <UIcon :name="isDark ? 'lucide:sun' : 'lucide:moon'" :class="props.iconSize" />
    </button>
</template>

<script setup lang="ts">
import { useDarkModeStore } from '~/store/useDarkModeStore'

const props = withDefaults(defineProps<{
    iconSize?: string
}>(), { iconSize: 'w-4 h-4' })

const darkModeStore = useDarkModeStore()

const ready = ref(false)

const isDark = computed(() => darkModeStore.isDark)

onMounted(() => {
    const storedDarkMode = localStorage.getItem('dark-mode')
    const shouldBeDark = storedDarkMode === 'true'
    darkModeStore.isDark = shouldBeDark
    document.documentElement.classList.toggle('dark', shouldBeDark)
    ready.value = true
})

function toggleDarkMode() {
    const next = !darkModeStore.isDark
    darkModeStore.isDark = next
    localStorage.setItem('dark-mode', next ? 'true' : 'false')
    document.documentElement.classList.toggle('dark', next)
}
</script>