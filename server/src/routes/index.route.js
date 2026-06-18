import authRoute from './auth.route.js';
import express from 'express';
import problemRoute from './problem.route.js';
import codeExecutionRoute from './codeExecution.route.js';

const router = express.Router();

router.use('/auth', authRoute);
router.use('/problems', problemRoute);
router.use('/code', codeExecutionRoute);

export default router;