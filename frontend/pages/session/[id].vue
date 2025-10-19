<template>
    <div
        class="min-h-screen p-6 flex flex-col"
        :class="[
            'bg-[rgb(var(--color-main))] text-[rgb(var(--color-text-primary))]'
        ]"
    >
        <UiSessionHeader
            :session-id="sessionId"
            :username="username"
            @copy-link="copyLink"
        />

        <UiVotingCards
            :options="cardOptions"
            :my-vote="myVote"
            :disabled="sessionEnded"
            @vote="vote"
        />

        <UiMembersList :users="users" />

        <div class="flex flex-col lg:flex-row gap-6 mb-6 max-w-4xl mx-auto w-full">
            <UiAverageVoteCard :average-vote="averageVote" />
            <UiVotesList
                :display-votes="displayVotes"
                :revealed="revealed"
                :most-popular-vote="mostPopularVote"
            />
        </div>

        <UiOwnerControls
            v-if="username === owner && !sessionEnded"
            @reveal="reveal"
            @reset="reset"
        />

        <CommonLeaveButton
            :username="username"
            :owner="owner"
            :session-ended="sessionEnded"
            @leave="leaveSession"
        />

        <UiUsernameModal
            v-if="!username"
            @confirmed="onUsernameConfirmed"
        />

        <CommonAlertModal
            v-model:open="showAlert"
            title="Session Has Ended"
            message="The owner has ended your session"
            @confirm="goHome"
        />
    </div>
</template>

<script setup>
import { io } from 'socket.io-client'

const route = useRoute()
const router = useRouter()
const config = useRuntimeConfig()
const toast = useToast()

const sessionId = computed(() => route.params.id)
const username = ref('')
const owner = ref('')
const users = ref([])
const votes = ref({})
const revealed = ref(false)
const sessionEnded = ref(false)
const showAlert = ref(false)
// eslint-disable-next-line no-magic-numbers
const cardOptions = [1, 2, 3, 5, 8, 13, 21, '?']

let socket

useHead({
    title: computed(() => `Planning Poker - ${sessionId.value}`),
    meta: [{
        name: 'description',
        content: 'Planning Poker App' 
    }]
})

const myVote = computed(() => votes.value[username.value] ?? null)

const displayVotes = computed(() =>
    Object.entries(votes.value).map(([user, voteValue]) => ({
        user,
        vote: revealed.value ? voteValue : '?',
        voted: votes.value[user] !== undefined
    }))
)

const averageVote = computed(() => {
    if (!revealed.value) return '-'
    const numericVotes = Object.values(votes.value)
        .filter(value => !isNaN(value))
        .map(Number)
    if (!numericVotes.length) return '-'
    const sum = numericVotes.reduce((first, second) => first + second, 0)
    return (sum / numericVotes.length).toFixed(1)
})

const mostPopularVote = computed(() => {
    if (!revealed.value) return null
    const counts = {}
    Object.values(votes.value)
        .filter(value => !isNaN(value))
        .forEach(value => (counts[value] = (counts[value] || 0) + 1))

    let maxCount = 0
    let popular = null
    for (const [vote, count] of Object.entries(counts))
        if (count > maxCount) {
            maxCount = count
            popular = vote
        }
    return popular
})

onMounted(() => {
    const saved = localStorage.getItem('poker_username')
    if (saved) {
        username.value = saved
        connectSocket()
    }
})

watch(
    () => route.params.id,
    (newId) => {
        socket?.emit('join', {
            sessionId: newId,
            username: username.value 
        })
    }
)

function goHome() {
    showAlert.value = false
    router.push('/')
}

function onUsernameConfirmed(finalName) {
    username.value = finalName
    localStorage.setItem('poker_username', finalName)
    connectSocket()
}

function connectSocket() {
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
        showAlert.value = true
    })
}

function vote(value) {
    if (!sessionEnded.value) 
        socket?.emit('vote', {
            sessionId: sessionId.value,
            username: username.value,
            value 
        })
}

function reveal() {
    socket?.emit('reveal', sessionId.value)
}

function reset() {
    socket?.emit('reset', sessionId.value)
}

function leaveSession() {
    socket?.emit('leave', sessionId.value)
    router.push('/')
}

function copyLink() {
    navigator.clipboard.writeText(window.location.href)
        .then(() => toast.add({
            title: 'Session link copied',
            color: 'primary' 
        }))
        .catch(() => toast.add({
            title: 'Failed to copy',
            color: 'red' 
        }))
}
</script>
