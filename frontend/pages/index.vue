<template>
    <div class="flex flex-col justify-center items-center min-h-[calc(100vh-128px)] bg-[#0f172a] text-white px-4">
        <!-- Title -->
        <h1 class="text-5xl font-extrabold mb-12 text-center text-[#cf8500]">
            Planning Poker
        </h1>

        <!-- Action Card -->
        <div class="bg-[#1e293b] rounded-2xl shadow-xl p-10 flex flex-col items-center gap-8 w-full max-w-md">
      
            <!-- Create Session Button -->
            <button
                class="w-full py-4 bg-[#cf8500] text-[#0f172a] font-semibold rounded-xl hover:bg-[#e0a13d] transition"
                @click="createSession"
            >
                Create New Session
            </button>

            <div class="w-full flex items-center justify-center gap-3 text-[#cf8500] font-medium">
                <span>or join an existing session</span>
            </div>

            <!-- Join Session Input -->
            <div class="w-full flex gap-3">
                <input
                    v-model="joinId"
                    type="text"
                    placeholder="Enter session ID"
                    class="flex-1 px-4 py-3 border border-[#cf8500] rounded-xl text-center text-white font-medium bg-[#0f172a] focus:outline-none focus:ring-2 focus:ring-[#cf8500]"
                />
                <button
                    class="px-5 py-3 bg-[#cf8500] text-[#0f172a] rounded-xl font-semibold hover:bg-[#e0a13d] transition"
                    @click="joinSession"
                >
                    Join
                </button>
            </div>

        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
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
