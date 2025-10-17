import { defineStore } from 'pinia'

export const useSessionStore = defineStore('session', {
    state: () => ({
        id: null,
        users: [],
        votes: {},
        revealed: false
    }),
    actions: {
        updateSession(data) {
            Object.assign(this, data)
        }
    }
})