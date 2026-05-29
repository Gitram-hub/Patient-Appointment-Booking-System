import { Router } from 'express';
import { createSlot, deleteSlot, listSlots, updateSlot } from '../controllers/slotController.js';
import { protect } from '../middleware/auth.js';
import { authorize } from '../middleware/role.js';
import { validate } from '../middleware/validate.js';
import { slotValidator } from '../validators/schemas.js';

const router = Router();

router.get('/', listSlots);
router.post('/', protect, authorize('doctor', 'admin'), slotValidator, validate, createSlot);
router.patch('/:id', protect, authorize('doctor', 'admin'), slotValidator, validate, updateSlot);
router.delete('/:id', protect, authorize('doctor', 'admin'), deleteSlot);

export default router;