import express from "express";

import {
  createProblem,
  getProblems,
  getProblemById,
  updateProblem,
  deleteProblem,
} from "../controllers/problem.controller.js";

import protect from "../middleware/auth.middleware.js";
import adminOnly from "../middleware/admin.middleware.js";

const router = express.Router();

router.post("/create-problem", protect, adminOnly, createProblem);

router.get("/all-problems", getProblems);

router.get("/get-problem/:id", getProblemById);

router.put("/update-problem/:id", protect, adminOnly, updateProblem);

router.delete("/delete-problem/:id", protect, adminOnly, deleteProblem);

export default router;
