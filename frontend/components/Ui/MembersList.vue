<template>
    <div class="flex flex-wrap justify-center gap-2 mb-4">
        <span
            v-for="user in users"
            :key="user"
            class="px-3 py-1 rounded-full text-sm font-medium bg-[rgb(var(--color-modal))] text-[rgb(var(--color-text-primary))] dark:border-none pill-light-border"
        >
            {{ user }}
        </span>
    </div>
</template>

<script setup>
defineProps({
    users: {
        type: Array,
        default: () => [] 
    }
})
</script>