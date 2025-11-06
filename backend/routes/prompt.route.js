import express from "express";
import { sendPrompt } from "../controller/Prompt.controller.js";
import promptMiddleware from "../middleware/prompt.middleware.js";
const router = express.Router();
router.post("/prompty", promptMiddleware , sendPrompt);
console.log("✅ prompt.route.js loaded");



export default router;




