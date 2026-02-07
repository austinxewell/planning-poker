<template>
    <div class="flex flex-wrap justify-center gap-2 mb-4">
        <div
            v-for="user in users"
            :key="user"
            class="px-3 py-1 rounded-full text-sm font-medium bg-[rgb(var(--color-modal))] text-[rgb(var(--color-text-primary))] dark:border-none pill-light-border"
        >
            {{ user }}

            <button 
                v-if="user === storedUser" 
                class="cursor-pointer"
                @click="editUsername"
            >
                <UIcon 
                    name="material-symbols:edit-outline-sharp"
                />
            </button>
        </div>

        <UiUsernameModal 
            v-if="isEditUsername"
            :stored-username="storedUser"
            @confirmed="onUsernameConfirmed"
        />
    </div>
</template>

<script setup>
defineProps({
    users: {
        type: Array,
        default: () => [] 
    }
})

const emit = defineEmits(['edit-username'])
const storedUser = localStorage.getItem('poker_username')
const isEditUsername = ref(false)

function editUsername() {
    isEditUsername.value = true
}

function onUsernameConfirmed(updatedUsername) {
    emit('edit-username', updatedUsername)
}
</script>