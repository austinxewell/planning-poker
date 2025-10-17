<template>
    <div class="bg-[#1e293b] p-6 rounded-xl text-center lg:w-48 flex-shrink-0 flex flex-col items-center justify-center">
        <h3 class="text-lg font-semibold mb-2 text-[#cf8500]">Average Vote</h3>
        <p class="text-5xl font-bold">{{ averageVote }}</p>
    </div>
</template>

<script setup>
defineProps({
    averageVote: {
        type: [String, Number],
        default: '-'
    }
})
</script>