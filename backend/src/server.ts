import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import chatRoutes from './routes/chat.routes';
import { errorMiddleware } from './middleware/error.middleware';

dotenv.config();

const app = express();

app.use(cors({ origin: process.env['ALLOWED_ORIGIN'] || 'http://localhost:4200' }));
app.use(express.json());

// Health check
app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));

// Routes
app.use('/api/chat', chatRoutes);

// Error handling (must be last)
app.use(errorMiddleware);

const PORT = parseInt(process.env['PORT'] || '3000', 10);
const MONGODB_URI = process.env['MONGODB_URI'] || 'mongodb://localhost:27017/chatbot';

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);
  });
