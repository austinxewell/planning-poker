<template>
    <div
        class="px-4 sm:px-0 flex justify-center w-full"
    >
        <div
            class="bg-modal rounded-3xl shadow-2xl p-6 sm:p-10 flex flex-col items-center gap-6 sm:gap-8 w-full max-w-md
            ring-1 ring-modalRing/20 relative z-10 transition-colors"
        >
            <CommonButton class="w-full py-3 sm:py-4" @click="createSession">
                Start New Session
            </CommonButton>

            <div class="w-full flex items-center justify-center gap-2 sm:gap-3 text-textPrimary font-medium text-sm sm:text-base">
                <span>or join an existing session</span>
            </div>

            <div class="w-full flex flex-col sm:flex-row gap-2 sm:gap-3">
                <CommonInput
                    v-model="joinId"
                    placeholder="Enter session ID"
                    class="flex-1"
                    @enter="joinSession"
                />

                <CommonButton class="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4" @click="joinSession">
                    Join
                </CommonButton>
            </div>
        </div>
    </div>
</template>

<script setup>
import axios from 'axios'

const router = useRouter()
const joinId = ref('')
const config = useRuntimeConfig()

async function createSession() {
    try {
        const res = await axios.post(`${config.public.SOCKET_URL}/session`)
        const id = res.data.id
        router.push(`/session/${id}`)
    } catch (err) {
        console.error('Failed to create session', err)
    }
}

function joinSession() {
    const id = joinId.value.trim()
    if (!id) return
    router.push(`/session/${id}`)
}
</script>
