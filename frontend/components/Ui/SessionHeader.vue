<template>
    <div class="mb-6 text-center">
        <div class="flex justify-center mb-2">
            <CommonButton
                class="px-4 py-2"
                variant="dark"
                @click="$emit('copy-link')"
            >
                <div class="flex gap-2 items-center text-xl">
                    Copy Session Link
                    <UIcon
                        name="i-heroicons-document-duplicate"
                        class="w-5 h-5"
                    />
                </div>
            </CommonButton>
        </div>

        <p class="font-bold my-2 text-[rgb(var(--color-text-primary))]">
            Session ID: {{ sessionId }}
        </p>

        <h2 class="text-xl text-[rgb(var(--color-text-primary))]">
            Hello, {{ username }}
        </h2>
    </div>
</template>

<script setup>
defineProps({
    sessionId: {
        type: String,
        default: '' 
    },
    username: {
        type: String,
        default: '' 
    }
})
</script>