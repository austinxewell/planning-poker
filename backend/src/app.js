// src/app.js
import express from "express";
import cors from "cors";

import { corsOptions } from "./config/corsOptions.js";
import router from "./routes/index.js";
import { FRONTEND_URL } from "./config/env.js";

const app = express();

app.use(cors(corsOptions));
app.use(express.json());

// Preflight middleware (serves same role as your original)
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

app.use("/", router);

export default app;