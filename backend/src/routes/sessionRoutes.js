// src/routes/sessionRoutes.js
import express from "express";

import { createSession } from "../services/sessionService.js";

const router = express.Router();

router.post("/", (req, res) => {
    const session = createSession();
    res.json(session);
});

export default router;
