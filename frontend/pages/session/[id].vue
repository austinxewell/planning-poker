<template>
    <div class="min-h-screen p-6 bg-[#0f172a] text-white flex flex-col">
        <!-- Session & Username -->
        <div class="mb-6 text-center">
            <h1 class="text-3xl font-bold mb-1">Session {{ sessionId }}</h1>
            <h2 class="text-lg text-gray-300">Hello, {{ username }}</h2>
        </div>

        <!-- Voting Cards -->
        <div class="flex flex-wrap gap-4 justify-center mb-6">
            <button
                v-for="card in cardOptions"
                :key="card"
                class="w-24 h-32 rounded-xl text-white text-2xl font-bold flex items-center justify-center shadow-md"
                :class="card === myVote ? 'bg-[#cf8500] text-[#0f172a]' : 'bg-[#1e293b] hover:bg-[#374151]'"
                :disabled="sessionEnded"
                @click="vote(card)"
            >
                {{ card }}
            </button>
        </div>

        <!-- Members -->
        <div class="flex flex-wrap justify-center gap-2 mb-4">
            <span
                v-for="user in users"
                :key="user"
                class="px-3 py-1 bg-[#1e293b] rounded-full text-sm font-medium"
            >
                {{ user }}
            </span>
        </div>

        <!-- Average Vote + Votes List -->
        <div class="flex flex-col lg:flex-row gap-6 mb-6 max-w-4xl mx-auto w-full">
            <!-- Average Vote -->
            <div class="bg-[#1e293b] p-6 rounded-xl text-center lg:w-48 flex-shrink-0 flex flex-col items-center justify-center">
                <h3 class="text-lg font-semibold mb-2 text-[#cf8500]">Average Vote</h3>
                <p class="text-5xl font-bold">{{ averageVote }}</p>
            </div>

            <!-- Votes List -->
            <div class="flex-1 bg-[#1e293b] p-4 rounded-xl max-h-[500px] overflow-y-auto">
                <h3 class="text-lg font-semibold mb-2 text-[#cf8500]">Votes</h3>
                <ul class="space-y-2">
                    <li
                        v-for="voteEntry in displayVotes"
                        :key="voteEntry.user"
                        class="flex justify-between p-2 rounded bg-[#0f172a]"
                    >
                        <span>{{ voteEntry.user }}</span>
                        <span>
                            <span v-if="voteEntry.voted">✅</span>
                            {{ voteEntry.vote }}
                        </span>
                    </li>
                </ul>
            </div>
        </div>

        <!-- Owner Controls -->
        <div v-if="username === owner && !sessionEnded" class="flex gap-3 mb-6 justify-center">
            <button
                class="px-4 py-2 bg-[#cf8500] text-[#0f172a] font-bold rounded hover:bg-[#e6a930]"
                @click="reveal"
            >
                Reveal
            </button>
            <button
                class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                @click="reset"
            >
                Reset
            </button>
        </div>

        <!-- Leave Button -->
        <div class="mb-6 text-center">
            <button
                class="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                @click="leaveSession"
            >
                Leave Session
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { io } from 'socket.io-client'
import { useRuntimeConfig } from '#imports'

const route = useRoute()
const router = useRouter()
const sessionId = ref(route.params.id)

const username = ref('')
const owner = ref('')

const users = ref([])
const votes = ref({})
const revealed = ref(false)
const sessionEnded = ref(false)

const cardOptions = [1, 2, 3, 5, 8, 13, 21, '?']

const config = useRuntimeConfig()
let socket

onMounted(() => {
    username.value = prompt('Enter your name:') || `User${Math.floor(Math.random() * 1000)}`
    socket = io(config.public.SOCKET_URL)

    socket.emit('join', {
        sessionId: sessionId.value,
        username: username.value 
    })

    socket.on('update', (data) => {
        users.value = data.users
        votes.value = data.votes
        revealed.value = data.revealed
        owner.value = data.owner
    })

    socket.on('sessionEnded', () => {
        sessionEnded.value = true
        alert('The session has ended because the owner left.')
        router.push('/')
    })
})

watch(() => route.params.id, (newId) => {
    sessionId.value = newId
    socket?.emit('join', {
        sessionId: newId,
        username: username.value 
    })
})

const averageVote = computed(() => {
    if (!revealed.value) return '-'  // hide until reveal
    const numericVotes = Object.values(votes.value)
        .filter(v => !isNaN(v))
        .map(Number)

    if (numericVotes.length === 0) return '-'
    const sum = numericVotes.reduce((a, b) => a + b, 0)
    return (sum / numericVotes.length).toFixed(1)
})

function vote(value) {
    if (!sessionEnded.value) socket?.emit('vote', {
        sessionId: sessionId.value,
        username: username.value,
        value 
    })
}

function reveal() { socket?.emit('reveal', sessionId.value) }
function reset() { socket?.emit('reset', sessionId.value) }
function leaveSession() { socket?.emit('leave', sessionId.value); router.push('/') }

const displayVotes = computed(() =>
    Object.entries(votes.value).map(([user, voteValue]) => ({
        user,
        vote: revealed.value ? voteValue : '?',
        voted: votes.value[user] !== undefined
    }))
)

const myVote = computed(() => votes.value[username.value] ?? null)
</script>
