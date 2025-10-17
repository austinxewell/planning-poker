<template>
    <div class="flex flex-wrap justify-center gap-2 mb-4">
        <span
            v-for="user in users"
            :key="user"
            class="px-3 py-1 bg-[#1e293b] rounded-full text-sm font-medium"
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