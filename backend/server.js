import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import { randomUUID } from "crypto";

dotenv.config();

const PORT = process.env.PORT || 4000;
const FRONTEND_URL = process.env.FRONTEND_URL || "https://auewellifyplanningpoker.netlify.app";

// Express setup
const app = express();

// Enable CORS for your frontend
app.use(cors({
  origin: FRONTEND_URL,
  methods: ["GET", "POST", "OPTIONS"],
  credentials: true,
}));
app.use(express.json());

// Health check endpoint
app.get("/", (req, res) => {
  res.send("Planning Poker backend is running");
});

// Session creation endpoint
app.post("/session", (req, res) => {
  const id = randomUUID().slice(0, 8);
  res.json({ id });
});

// Attach Express app to HTTP server
const httpServer = createServer(app);

// Socket.IO setup
const io = new Server(httpServer, {
  cors: {
    origin: FRONTEND_URL,
    methods: ["GET", "POST"],
    credentials: true,
  },
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

// Start server
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
