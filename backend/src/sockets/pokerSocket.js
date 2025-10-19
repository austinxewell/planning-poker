// src/sockets/pokerSocket.js
import { ensureSession, getSession, deleteSession } from "../services/sessionService.js";

export default function pokerSocket(io) {
    io.on("connection", (socket) => {
        console.log("Client connected:", socket.id);

        socket.on("join", ({ sessionId, username }) => {
            socket.username = username;
            const session = ensureSession(sessionId, username);

            if (!session.users.includes(username)) session.users.push(username);
            socket.join(sessionId);
            io.to(sessionId).emit("update", session);
        });

        socket.on("vote", ({ sessionId, username, value }) => {
            const session = getSession(sessionId);
            if (!session) return;
            session.votes[username] = value;
            io.to(sessionId).emit("update", session);
        });

        socket.on("reveal", (sessionId) => {
            const session = getSession(sessionId);
            if (!session || socket.username !== session.owner) return;
            session.revealed = true;
            io.to(sessionId).emit("update", session);
        });

        socket.on("reset", (sessionId) => {
            const session = getSession(sessionId);
            if (!session || socket.username !== session.owner) return;
            session.votes = {};
            session.revealed = false;
            io.to(sessionId).emit("update", session);
        });

        socket.on("leave", (sessionId) => {
            const session = getSession(sessionId);
            if (!session) return;

            session.users = session.users.filter((u) => u !== socket.username);

            if (socket.username === session.owner) {
                io.to(sessionId).emit("sessionEnded");
                deleteSession(sessionId);
            } else {
                io.to(sessionId).emit("update", session);
            }
        });

        socket.on("disconnect", () => {
            console.log("Client disconnected:", socket.id);
        });
    });
}
