<template>
    <input
        v-bind="$attrs"
        :type="type"
        :placeholder="placeholder"
        :value="modelValue"
        class="flex-1 px-4 py-3 border border-[#cf8500] rounded-xl text-center text-white font-medium bg-[#0f172a] placeholder-[#cf8500] focus:outline-none focus:ring-2 focus:ring-[#cf8500] focus:ring-offset-1"
        @input="(e: Event) => emit('update:modelValue', (e.target as HTMLInputElement).value)"
        @keyup.enter="$emit('enter')"
    />
</template>

<script setup lang="ts">
defineProps({
    modelValue: {
        type: [String, Number],
        default: ''
    },
    placeholder: {
        type: String,
        default: ''
    },
    type: {
        type: String,
        default: 'text'
    }
})

const emit = defineEmits(['update:modelValue', 'enter'])
</script>
