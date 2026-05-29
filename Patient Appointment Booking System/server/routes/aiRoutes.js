import { Router } from 'express';
import { chatWithAi } from '../controllers/aiController.js';
import { protect } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { aiChatValidator } from '../validators/schemas.js';

const router = Router();

router.post('/chat', protect, aiChatValidator, validate, chatWithAi);

export default router;