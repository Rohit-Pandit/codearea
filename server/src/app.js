import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import routes from './routes/index.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

app.use('/api/v1', routes);

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'code arena server is running'
  });
});

export default app;