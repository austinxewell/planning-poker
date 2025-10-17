<template>
    <div class="mb-6 text-center">
        <button
            class="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
            @click="$emit('leave')"
        >
            {{ username === owner && !sessionEnded ? 'End Session' : 'Leave Session' }}
        </button>
    </div>
</template>

<script setup>
defineProps({
    username: {
        type: String,
        default: ''
    },
    owner: {
        type: String,
        default: ''
    },
    sessionEnded: {
        type: Boolean,
        default: false
    }
})
</script>