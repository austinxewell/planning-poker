// src/config/corsOptions.js
import { FRONTEND_URL } from "./env.js";

export const allowedOrigins = [
    FRONTEND_URL,
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
].filter(Boolean);

export const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
        console.warn(`Blocked by CORS: ${origin}`);
        callback(null, false);
    },
    methods: ["GET", "POST", "OPTIONS"],
    credentials: true,
};
