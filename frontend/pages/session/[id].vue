<template>
    <div class="min-h-screen p-6 bg-gray-50 text-black">
        <h1 class="text-3xl font-bold mb-4">Session {{ sessionId }}</h1>
        <h2 class="text-lg mb-4">Hello, {{ username }}</h2>

        <!-- Voting Cards -->
        <div class="flex flex-wrap gap-3 mb-6">
            <button
                v-for="card in cardOptions"
                :key="card"
                class="w-28 h-36 text-white rounded"
                :class="card === myVote ? 'bg-blue-800' : 'bg-blue-600'"
                :disabled="sessionEnded"
                @click="vote(card)"
            >
                {{ card }}
            </button>
        </div>

        <!-- Owner Controls -->
        <div v-if="username === owner && !sessionEnded" class="flex gap-3 mb-6">
            <button class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600" @click="reveal">Reveal</button>
            <button class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600" @click="reset">Reset</button>
        </div>

        <!-- Leave Button -->
        <div class="mb-6">
            <button class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600" @click="leaveSession">
                Leave Session
            </button>
        </div>

        <!-- Votes List -->
        <div>
            <h3 class="text-xl font-semibold mb-2">Votes</h3>
            <ul class="space-y-1">
                <li
                    v-for="voteEntry in displayVotes"
                    :key="voteEntry.user"
                    class="p-2 border rounded bg-white flex justify-between"
                >
                    <span class="font-medium">{{ voteEntry.user }}</span>
                    <span>
                        <span v-if="voteEntry.voted">✅</span>
                        {{ voteEntry.vote }}
                    </span>
                </li>
            </ul>
        </div>

        <!-- Connected Users -->
        <div class="mt-6">
            <h3 class="text-xl font-semibold mb-2">Connected Users</h3>
            <ul class="space-y-1">
                <li
                    v-for="user in users"
                    :key="user"
                    class="p-2 border rounded bg-white"
                >
                    {{ user }}
                </li>
            </ul>
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

// Initialize browser-only code in onMounted
onMounted(() => {
    // Prompt for username
    username.value = prompt('Enter your name:') || `User${Math.floor(Math.random() * 1000)}`

    // Initialize socket
    socket = io(config.public.SOCKET_URL)

    // Join session
    socket.emit('join', {
        sessionId: sessionId.value,
        username: username.value 
    })

    // Socket events
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

// Watch for route changes (dynamic session ID)
watch(() => route.params.id, (newId) => {
    sessionId.value = newId
    if (socket) 
        socket.emit('join', {
            sessionId: newId,
            username: username.value 
        })
  
})

// Actions
function vote(value) {
    if (!sessionEnded.value && socket) 
        socket.emit('vote', {
            sessionId: sessionId.value,
            username: username.value,
            value 
        })
  
}

function reveal() {
    socket?.emit('reveal', sessionId.value)
}

function reset(){
    socket?.emit('reset', sessionId.value)
} 

function leaveSession() {
    socket?.emit('leave', sessionId.value)
    router.push('/')
}

// Computed
const displayVotes = computed(() =>
    Object.entries(votes.value).map(([user, voteValue]) => ({
        user,
        vote: revealed.value ? voteValue : '?',
        voted: votes.value[user] !== undefined
    }))
)

const myVote = computed(() => votes.value[username.value] ?? null)
</script>
