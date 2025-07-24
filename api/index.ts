import { VercelRequest, VercelResponse } from '@vercel/node';
import express from 'express';
import cors from 'cors';
import { handleDemo } from '../server/routes/demo';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes
app.get('/api/ping', (_req, res) => {
  res.json({ message: 'Hello from Express server v2!' });
});

app.get('/api/demo', handleDemo);

// Handle all API routes
app.all('*', (req, res) => {
  res.status(404).json({ error: 'API endpoint not found' });
});

export default app;
