import authRoute from './auth.route.js';
import express from 'express';
import problemRoute from './problem.route.js';

const router = express.Router();

router.use('/auth', authRoute);
router.use('/problems', problemRoute);

export default router;