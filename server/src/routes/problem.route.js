import express from 'express';
import { getAllProblems, getProblemById } from '../controllers/problem.controller.js';
import adminOnly from '../middleware/admin.middleware.js';


const router = express.Router();

router.get('/', getAllProblems);
router.get('/:id', getProblemById);
router.post('/', adminOnly, createProblem);
router.put('/:id', adminOnly, updateProblem);
router.delete('/:id', adminOnly, deleteProblem);

export default router;