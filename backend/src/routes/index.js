// src/routes/index.js
import express from "express";

import sessionRoutes from "./sessionRoutes.js";

const router = express.Router();

router.get("/", (req, res) => res.send("Planning Poker backend is running"));
router.use("/session", sessionRoutes);

export default router;
