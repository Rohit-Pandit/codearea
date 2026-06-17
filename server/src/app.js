import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import routes from './routes/index.route.js';
import {CLIENT_URL} from './config/env.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: CLIENT_URL,
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());



app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'code arena server is running'
  });
});

app.use('/api/v1', routes);

export default app;