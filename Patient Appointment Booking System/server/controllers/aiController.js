import { asyncHandler } from '../utils/asyncHandler.js';
import { answerChat } from '../services/chatService.js';

export const chatWithAi = asyncHandler(async (req, res) => {
  const result = await answerChat({
    message: req.body.message,
    conversationId: req.body.conversationId,
    context: req.body.context || {},
    user: req.user || null
  });

  res.json({ success: true, ...result });
});