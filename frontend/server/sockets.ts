import { Server } from 'socket.io'

export default defineNitroPlugin((nitroApp) => {
    const server = nitroApp.h3App?.server
    if (!server) return

    const io = new Server(server, {
        path: '/socket.io',       // must match client
        cors: { origin: '*' }     // allows localhost tabs
    })

    const sessions = new Map()

    io.on('connection', (socket) => {
        console.log('Client connected', socket.id)

        socket.on('join', ({ sessionId, username }) => {
            socket.join(sessionId)

            if (!sessions.has(sessionId)) sessions.set(sessionId, {
                users: [],
                votes: {},
                revealed: false 
            })
            const session = sessions.get(sessionId)

            if (!session.users.includes(username)) session.users.push(username)

            io.to(sessionId).emit('update', session)
        })

        socket.on('vote', ({ sessionId, username, value }) => {
            const session = sessions.get(sessionId)
            if (!session) return
            session.votes[username] = value
            io.to(sessionId).emit('update', session)
        })

        socket.on('reveal', (sessionId) => {
            const session = sessions.get(sessionId)
            if (!session) return
            session.revealed = true
            io.to(sessionId).emit('update', session)
        })

        socket.on('reset', (sessionId) => {
            const session = sessions.get(sessionId)
            if (!session) return
            const session = sessions.get(sessionId)
            session.votes = {}
            session.revealed = false
            io.to(sessionId).emit('update', session)
        })
    })
})
