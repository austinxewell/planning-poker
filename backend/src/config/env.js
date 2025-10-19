// src/config/env.js
import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || 4000;
export const FRONTEND_URL = process.env.FRONTEND_URL || "https://auewellifyplanningpoker.netlify.app";
