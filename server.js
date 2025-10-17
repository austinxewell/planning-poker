import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.SOCKET_PORT || 4000;

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: process.env.VITE_SOCKET_URL || "*",
    methods: ["GET", "POST"]
  }
});

// In-memory session store
const sessions = new Map();

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("join", ({ sessionId, username }) => {
    socket.username = username;

    let session = sessions.get(sessionId);
    if (!session) {
      session = { users: [], votes: {}, revealed: false, owner: username };
      sessions.set(sessionId, session);
    }

    if (!session.users.includes(username)) session.users.push(username);

    socket.join(sessionId);
    io.to(sessionId).emit("update", session);
  });

  socket.on("vote", ({ sessionId, username, value }) => {
    const session = sessions.get(sessionId);
    if (!session) return;
    session.votes[username] = value;
    io.to(sessionId).emit("update", session);
  });

  socket.on("reveal", (sessionId) => {
    const session = sessions.get(sessionId);
    if (!session || socket.username !== session.owner) return;
    session.revealed = true;
    io.to(sessionId).emit("update", session);
  });

  socket.on("reset", (sessionId) => {
    const session = sessions.get(sessionId);
    if (!session || socket.username !== session.owner) return;
    session.votes = {};
    session.revealed = false;
    io.to(sessionId).emit("update", session);
  });

  socket.on("leave", (sessionId) => {
    const session = sessions.get(sessionId);
    if (!session) return;

    session.users = session.users.filter((u) => u !== socket.username);

    if (socket.username === session.owner) {
      io.to(sessionId).emit("sessionEnded");
      sessions.delete(sessionId);
    } else {
      io.to(sessionId).emit("update", session);
    }
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

httpServer.listen(PORT, () => {
  console.log(`Socket.IO server running on port ${PORT}`);
});
