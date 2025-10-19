<template>
    <div
        class="flex-1 p-4 rounded-xl max-h-[500px] overflow-y-auto shadow-md pill-light-border voting-card-light-border"
        :class="['bg-[rgb(var(--color-modal))]']"
    >
        <h3
            class="text-lg font-semibold mb-4 text-center"
            :class="['text-[rgb(var(--color-text-primary))]']"
        >
            Votes
        </h3>

        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 justify-items-center">
            <div
                v-for="voteEntry in displayVotes"
                :key="voteEntry.user"
                class="flex flex-col items-center"
            >
                <div class="relative w-20 h-28 perspective-[600px]">
                    <div
                        class="absolute inset-0 transition-transform duration-500 transform-style-preserve-3d"
                        :class="revealed ? 'rotate-y-180' : 'rotate-y-0'"
                    >
                        <!-- Front -->
                        <div
                            class="absolute inset-0 flex items-center justify-center rounded-lg text-2xl font-bold shadow-md voting-card-light-border"
                            :class="['bg-[rgb(var(--color-modal))] text-[rgb(var(--color-text-primary))]']"
                            style="backface-visibility: hidden;"
                        >
                            ❓
                        </div>

                        <!-- Back -->
                        <div
                            class="absolute inset-0 flex items-center justify-center rounded-lg text-2xl font-bold shadow-md transform rotate-y-180 transition-colors duration-300 voting-card-light-border"
                            :class="voteEntry.vote === mostPopularVote
                                ? 'bg-[rgb(var(--color-gold))] text-[rgb(var(--color-text-primary))] border-4 border-[rgb(var(--color-card-border))]'
                                : 'bg-[rgb(var(--color-modal))] text-[rgb(var(--color-text-primary))] border-4 border-[rgb(var(--color-card-border))]'"
                            style="backface-visibility: hidden;"
                        >
                            {{ voteEntry.vote }}
                        </div>
                    </div>
                </div>

                <span
                    class="mt-2 text-sm font-medium truncate w-20 text-center"
                    :class="['text-[rgb(var(--color-text-primary))]']"
                >
                    {{ voteEntry.user }}
                </span>
            </div>
        </div>
    </div>
</template>



<script setup>
defineProps({
    displayVotes: {
        type: Array,
        default: () => []
    },
    revealed: {
        type: Boolean,
        default: false
    },
    mostPopularVote: {
        type: [String, Number],
        default: null
    }
})
</script>