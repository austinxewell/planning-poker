<template>
    <input
        v-bind="$attrs"
        :type="type"
        :placeholder="placeholder"
        :value="modelValue"
        class="flex-1 px-4 py-3 rounded-xl text-center font-medium focus:outline-none focus:ring-2 focus:ring-offset-1 input-light-border"
        :class="[
            'bg-[rgb(var(--color-main))] text-[rgb(var(--color-text-primary))] placeholder-[rgb(var(--color-text-primary))] focus:ring-[rgb(var(--color-text-primary))]'
        ]"
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
