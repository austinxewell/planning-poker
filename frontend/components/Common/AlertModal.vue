<template>
    <UModal
        v-model:open="internalOpen"
        :dismissible="false"
        :hide-close-button="true"
    >
        <template #content>
            <div
                class="flex flex-col items-center justify-center min-h-[200px] gap-6
                bg-modal text-textPrimary dark:bg-modal dark:text-textPrimary
                border border-cardBorder rounded-lg p-6 transition-colors"
            >
                <h2 class="text-xl font-bold text-textPrimary">
                    {{ title }}
                </h2>

                <p class="text-textPrimary/80 text-center">
                    {{ message }}
                </p>

                <div class="w-full flex justify-center">
                    <CommonButton
                        class="w-48 py-4 bg-gradient-to-r from-primary-from to-primary-to text-darkText font-semibold rounded"
                        @click="handleConfirm"
                    >
                        {{ confirmText }}
                    </CommonButton>
                </div>
            </div>
        </template>
    </UModal>
</template>

<script setup lang="ts">
const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false
    },
    title: {
        type: String,
        default: 'Notice'
    },
    message: {
        type: String,
        default: ''
    },
    confirmText: {
        type: String,
        default: 'OK'
    }
})

const emit = defineEmits(['update:modelValue', 'confirm'])
const internalOpen = ref(props.modelValue)

watch(() => props.modelValue, (val) => {
    internalOpen.value = val
})

watch(internalOpen, (val) => {
    emit('update:modelValue', val)
})

function handleConfirm() {
    emit('confirm')
    internalOpen.value = false
}
</script>
