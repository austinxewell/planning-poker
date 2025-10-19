<template>
    <UModal v-model:open="isOpen" :dismissible="false">
        <template #content>
            <div
                class="flex flex-col items-center justify-center min-h-[200px] gap-6 bg-modal text-textPrimary dark:bg-modal dark:text-textPrimary border border-cardBorder rounded-lg p-6 transition-colors"
            >
                <h2
                    class="text-xl font-bold"
                    :class="['text-[rgb(var(--color-primary))]']"
                >
                    Enter Your Username
                </h2>

                <div class="w-full max-w-sm flex gap-3">
                    <CommonInput
                        v-model="tempUsername"
                        placeholder="Enter Username"
                        autofocus
                        @enter="confirmUsername"
                    />

                    <CommonButton
                        class="px-5 py-3"
                        variant="primary"
                        @click="confirmUsername"
                    >
                        Join
                    </CommonButton>
                </div>
            </div>
        </template>
    </UModal>
</template>
<script setup>
const emit = defineEmits(['confirmed'])
const isOpen = ref(true)
const tempUsername = ref('')

defineShortcuts({ o: () => isOpen.value = !isOpen.value })

function confirmUsername() {
    const MAX_USERNAME_NUMBER_LENGTH = 1000

    const name = tempUsername.value.trim()
    const finalName = name || `User${Math.floor(Math.random() * MAX_USERNAME_NUMBER_LENGTH)}`
    isOpen.value = false
    emit('confirmed', finalName)
}
</script>