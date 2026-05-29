import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import chatRoutes from './routes/chatRoutes.js';

dotenv.config();

const app = express();
const port = process.env.AI_PORT || 5001;

app.use(cors());
app.use(express.json({ limit: '2mb' }));

app.get('/health', (_req, res) => {
  res.json({ success: true, message: 'AI service is running' });
});

app.use('/api/chat', chatRoutes);

app.use((error, _req, res, _next) => {
  res.status(500).json({ success: false, message: error.message || 'Internal server error' });
});

app.listen(port, () => {
  console.log(`AI service running on http://localhost:${port}`);
});