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

        <h2
            class="flex items-center justify-center gap-2 text-xl text-[rgb(var(--color-text-primary))]"
        >
            <span class="leading-none">
                Hello, {{ username }}
            </span>

            <button
                class="flex items-center leading-none cursor-pointer"
                @click="toggleEditUsername"
            >
                <UIcon
                    name="material-symbols:edit-outline-sharp"
                    class="text-xl"
                />
            </button>
        </h2>

        <UiUsernameModal 
            v-if="isEditUsername"
            :stored-username="username"
            @confirmed="onUsernameConfirmed"
        />
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

const emit = defineEmits(['copy-link', 'edit-username'])
const isEditUsername = ref(false)

function toggleEditUsername() {
    isEditUsername.value = true
}

function onUsernameConfirmed(updatedUsername) {
    emit('edit-username', updatedUsername)
    isEditUsername.value = false
}
</script>