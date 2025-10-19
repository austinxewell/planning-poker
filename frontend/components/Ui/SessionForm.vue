<template>
    <div class="bg-[#1e293b] rounded-3xl shadow-2xl p-10 flex flex-col items-center gap-8 w-full max-w-md ring-1 ring-[#cf8500]/20 relative z-10">
        <CommonButton class="w-full py-4" @click="createSession">
            Start New Session
        </CommonButton>

        <div class="w-full flex items-center justify-center gap-3 text-[#cf8500] font-medium">
            <span>or join an existing session</span>
        </div>

        <div class="w-full flex gap-3">
            <CommonInput
                v-model="joinId"
                placeholder="Enter session ID"
                @enter="joinSession"
            />
            <CommonButton
                class="px-8 py-4"
                @click="joinSession"
            >
                Join
            </CommonButton>
        </div>
    </div>
</template>

<script setup>
import axios from 'axios'
import { useRuntimeConfig } from '#imports'

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