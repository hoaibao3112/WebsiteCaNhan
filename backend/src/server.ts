import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import templateRoutes from './routes/template.routes.js';
import { apiLimiter } from './middleware/rate-limiter.js';
import { apiKeyGuard } from './middleware/api-key.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigin = process.env.CORS_ORIGIN || '*';
app.use(cors({
  origin: allowedOrigin,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-api-key']
}));

app.use(express.json());

// Apply rate limiter globally to all API routes
app.use('/api', apiLimiter);

// Main Routes (Protected by API Key Validation)
app.use('/api/templates', apiKeyGuard, templateRoutes);

// Health check for Render deployment (Unprotected for Render's pinger)
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
