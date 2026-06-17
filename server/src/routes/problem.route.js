import express from 'express';
import { getAllProblems, getProblemById } from '../controllers/problem.controller.js';


const router = express.Router();

router.get('/', getAllProblems);
router.get('/:id', getProblemById);


export default router;