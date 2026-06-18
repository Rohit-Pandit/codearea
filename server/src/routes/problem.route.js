import express from "express";

import {
  createProblem,
  getProblems,
  getProblemById,
} from "../controllers/problem.controller.js";

import protect from "../middleware/auth.middleware.js";
import adminOnly from "../middleware/admin.middleware.js";

const router = express.Router();

router.post("/create-problem", protect, adminOnly, createProblem);

router.get("/all-problems", getProblems);

router.get("/get-problem/:id", getProblemById);

export default router;
