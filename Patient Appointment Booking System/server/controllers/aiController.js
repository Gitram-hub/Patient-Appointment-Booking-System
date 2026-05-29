import axios from 'axios';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/apiError.js';
import { env } from '../config/env.js';

export const chatWithAi = asyncHandler(async (req, res) => {
  try {
    const response = await axios.post(`${env.aiServiceUrl}/api/chat`, {
      message: req.body.message,
      conversationId: req.body.conversationId,
      context: req.body.context || {},
      user: req.user || null
    });

    res.json({ success: true, ...response.data });
  } catch {
    throw new ApiError(502, 'AI service is unavailable');
  }
});