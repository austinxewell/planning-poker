<template>
    <button
        v-bind="$attrs"
        :class="[
            baseClasses,
            variantClasses[variant] || variantClasses.primary
        ]"
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
    primary: 'bg-gradient-to-r from-[#cf8500] to-[#e0a13d] text-[#0f172a]',
    gold: 'bg-[#cf8500] text-[#0f172a]',
    red: 'bg-[#b91c1c] text-white',
    neutral: 'bg-[#1e293b] text-white border border-gray-600 hover:bg-[#334155]',
    dark: 'bg-[#1e293b] text-[#cf8500] hover:bg-[#374151] text-[#cf8500]'
}
</script>
