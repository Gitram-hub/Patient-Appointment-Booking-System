import jwt from 'jsonwebtoken';
import { ApiError } from '../utils/apiError.js';
import { env } from '../config/env.js';

export const protect = (req, _res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;

  if (!token) {
    throw new ApiError(401, 'Authentication required');
  }

  try {
    req.user = jwt.verify(token, env.jwtSecret);
    next();
  } catch {
    throw new ApiError(401, 'Invalid or expired token');
  }
};