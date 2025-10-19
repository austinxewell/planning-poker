<template>
    <div class="flex gap-3 mb-6 justify-center">
        <CommonButton
            class="w-40 h-12"
            variant="gold"
            @click="$emit('reveal')"
        >
            Reveal
        </CommonButton>

        <CommonButton
            class="w-40 h-12"
            variant="red"
            @click="$emit('reset')"
        >
            Reset
        </CommonButton>
    </div>
</template>

<script setup lang="ts">
defineEmits(['reveal', 'reset'])
</script>
