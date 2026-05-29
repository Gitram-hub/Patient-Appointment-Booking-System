import { answerChat } from '../services/chatService.js';

export const chat = async (req, res, next) => {
  try {
    const result = await answerChat(req.body);
    res.json({ success: true, ...result });
  } catch (error) {
    next(error);
  }
};