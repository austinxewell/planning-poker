<template>
    <div class="flex flex-wrap gap-4 justify-center mb-6">
        <button
            v-for="card in options"
            :key="card"
            :disabled="disabled"
            class="w-24 h-32 rounded-xl text-2xl font-bold flex items-center justify-center transition-shadow duration-200 shadow-md"
            :class="[
                card === myVote
                    ? 'bg-[rgb(var(--color-gold))] text-[#0f172a] shadow-lg'
                    : 'bg-[rgb(var(--color-modal))] text-[rgb(var(--color-text-primary))] hover:bg-[rgb(var(--color-card-hover))] dark:hover:bg-[rgb(var(--color-card-hover))] voting-card-light-border'
            ]"
            @click="$emit('vote', card)"
        >
            {{ card }}
        </button>
    </div>
</template>

<script setup>
defineProps({
    options: {
        type: Array,
        default: () => [] 
    },
    myVote: {
        type: [String, Number],
        default: null
    },
    disabled: { type: Boolean }
})
</script>