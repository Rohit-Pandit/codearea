import express from "express";
import protect from "../middleware/auth.middleware.js";
import {submitSolution,getMySubmissions,getProblemSubmissions}  from "../controllers/submission.controller.js";

const router = express.Router();

router.post("/", protect, submitSolution);
router.get("/me", protect, getMySubmissions);
router.get("/problem/:problemId", protect, getProblemSubmissions);

export default router;