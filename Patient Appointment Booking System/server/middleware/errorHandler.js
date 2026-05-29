import { ApiError } from '../utils/apiError.js';

export const notFound = (_req, _res, next) => {
  next(new ApiError(404, 'Route not found'));
};

export const errorHandler = (error, _req, res, _next) => {
  const statusCode = error instanceof ApiError ? error.statusCode : 500;
  const message = error?.message || 'Internal server error';
  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' ? { stack: error?.stack } : {})
  });
};