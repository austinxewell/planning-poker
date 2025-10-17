<template>
    <div class="mb-6 text-center">
        <h1 class="text-3xl font-bold mb-2">Session {{ sessionId }}</h1>
        <div class="flex justify-center mb-2">
            <button
                class="inline-flex items-center gap-2 px-4 py-2 bg-[#1e293b] rounded-lg hover:bg-[#374151] transition text-sm text-[#cf8500]"
                title="Copy session link"
                @click="$emit('copy-link')"
            >
                Copy Session Link
                <UIcon
                    name="i-heroicons-document-duplicate"
                    class="w-5 h-5 text-[#cf8500]"
                />
            </button>
        </div>
        <h2 class="text-lg text-gray-300">Hello, {{ username }}</h2>
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