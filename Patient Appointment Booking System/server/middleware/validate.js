import { validationResult } from 'express-validator';
import { ApiError } from '../utils/apiError.js';

export const validate = (req, _res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    throw new ApiError(400, result.array().map((item) => item.msg).join(', '));
  }
  next();
};