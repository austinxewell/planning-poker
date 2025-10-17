<template>
    <div class="flex flex-wrap gap-4 justify-center mb-6">
        <button
            v-for="card in options"
            :key="card"
            class="w-24 h-32 rounded-xl text-white text-2xl font-bold flex items-center justify-center shadow-md"
            :class="card === myVote ? 'bg-[#cf8500] text-[#0f172a]' : 'bg-[#1e293b] hover:bg-[#374151]'"
            :disabled="disabled"
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