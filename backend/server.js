import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import { randomUUID } from "crypto";

dotenv.config();

const PORT = process.env.PORT || 4000;
const FRONTEND_URL = process.env.FRONTEND_URL || "https://auewellifyplanningpoker.netlify.app";

// Allowed origins for local dev + production
const allowedOrigins = [
  FRONTEND_URL,
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "http://localhost:5173",
  "http://127.0.0.1:5173",
].filter(Boolean);

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    console.warn(`Blocked by CORS: ${origin}`);
    return callback(null, false); // don’t throw, just block
  },
  methods: ["GET", "POST", "OPTIONS"],
  credentials: true,
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());

// ✅ Preflight middleware (replaces app.options("*", ...))
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Origin", req.headers.origin || FRONTEND_URL);
    res.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    return res.sendStatus(204);
  }
  next();
});

// Health check endpoint
app.get("/", (req, res) => {
  res.send("Planning Poker backend is running");
});

// Session creation endpoint
app.post("/session", (req, res) => {
  const id = randomUUID().slice(0, 8);
  res.json({ id });
});

// HTTP + Socket.IO
const httpServer = createServer(app);

const io = new Server(httpServer, { cors: corsOptions });

// In-memory sessions
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
httpServer.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
  console.log("Allowed Origins:", allowedOrigins);
});
