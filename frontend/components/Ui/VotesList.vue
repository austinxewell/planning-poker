<template>
    <div class="flex-1 bg-[#1e293b] p-4 rounded-xl max-h-[500px] overflow-y-auto">
        <h3 class="text-lg font-semibold mb-4 text-[#cf8500] text-center">Votes</h3>

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
                            class="absolute inset-0 flex items-center justify-center bg-white text-gray-400 rounded-lg text-2xl font-bold shadow-md"
                            style="backface-visibility: hidden;"
                        >
                            ❓
                        </div>

                        <!-- Back -->
                        <div
                            class="absolute inset-0 flex items-center justify-center rounded-lg text-2xl font-bold shadow-md transform rotate-y-180 transition-colors duration-300"
                            :class="voteEntry.vote === mostPopularVote 
                                ? 'bg-[#cf8500] text-[#1e293b] border-2 border-[#d4a017]'
                                : 'bg-white text-[#1e293b] border border-gray-300'"
                            style="backface-visibility: hidden;"
                        >
                            {{ voteEntry.vote }}
                        </div>
                    </div>
                </div>
                <span class="mt-2 text-sm text-gray-300 font-medium truncate w-20 text-center">
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