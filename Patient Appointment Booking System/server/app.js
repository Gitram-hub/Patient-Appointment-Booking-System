import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import { env } from './config/env.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';
import authRoutes from './routes/authRoutes.js';
import doctorRoutes from './routes/doctorRoutes.js';
import slotRoutes from './routes/slotRoutes.js';
import appointmentRoutes from './routes/appointmentRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import aiRoutes from './routes/aiRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const createApp = () => {
  const app = express();
  const allowedOrigins = [
    'http://localhost:5173',
    'https://patient-appointment-booking-system.vercel.app',
    env.clientUrl,
    ...env.clientUrls
  ].filter(Boolean);

  app.use(cors({
    origin: (origin, callback) => {
      if (!origin) {
        callback(null, true);
        return;
      }

      if (allowedOrigins.includes('*') || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true
  }));
  app.use(express.json({ limit: '2mb' }));
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(morgan(env.nodeEnv === 'production' ? 'combined' : 'dev'));
  app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

  app.get('/health', (_req, res) => {
    res.json({ success: true, message: 'Patient Booking API is running' });
  });

  app.use('/api/auth', authRoutes);
  app.use('/api/doctors', doctorRoutes);
  app.use('/api/slots', slotRoutes);
  app.use('/api/appointments', appointmentRoutes);
  app.use('/api/dashboard', dashboardRoutes);
  app.use('/api/ai', aiRoutes);

  app.use(notFound);
  app.use(errorHandler);

  return app;
};