<template>
    <div class="mb-6 text-center">
        <CommonButton
            class="w-40 h-12"
            variant="neutral"
            @click="$emit('leave')"
        >
            {{ username === owner && !sessionEnded ? 'End Session' : 'Leave Session' }}
        </CommonButton>
    </div>
</template>

<script setup lang="ts">
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

defineEmits(['leave'])
</script>