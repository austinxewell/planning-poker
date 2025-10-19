<template>
    <div
        class="p-6 rounded-xl text-center lg:w-48 flex-shrink-0 flex flex-col items-center justify-center shadow-md pill-light-border voting-card-light-border"
        :class="['bg-[rgb(var(--color-modal))] text-[rgb(var(--color-text-primary))]']"
    >
        <h3 class="text-lg font-semibold mb-2" >
            Average Vote
        </h3>
        <p class="text-5xl font-bold">
            {{ averageVote }}
        </p>
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