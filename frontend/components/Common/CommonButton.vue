<template>
    <button
        v-bind="$attrs"
        :class="[baseClasses, variantClasses[variant] || variantClasses.primary]"
        @click="$emit('click')"
    >
        <slot />
    </button>
</template>

<script setup lang="ts">
defineProps({
    variant: {
        type: String as () => 'primary' | 'gold' | 'red' | 'neutral' | 'dark',
        default: 'primary'
    }
})

defineEmits(['click'])

const baseClasses =
  'rounded-xl font-semibold hover:scale-105 transition transform shadow hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer'

const variantClasses: Record<string, string> = {
    primary: 'bg-gradient-to-r from-[rgb(var(--color-primary-from))] to-[rgb(var(--color-primary-to))] text-[#0f172a]',
    gold: 'bg-[rgb(var(--color-gold))] text-[#0f172a]',
    red: 'bg-[rgb(var(--color-red))] text-white',
    neutral: 'bg-[rgb(var(--color-neutral-bg))] text-[rgb(var(--color-neutral-text))] border border-[rgb(var(--color-card-border))] hover:bg-[rgb(var(--color-card-hover))]',
    dark: 'bg-[rgb(var(--color-dark-bg))] text-[rgb(var(--color-dark-text))] hover:bg-[rgb(var(--color-card-hover))]'
}
</script>
