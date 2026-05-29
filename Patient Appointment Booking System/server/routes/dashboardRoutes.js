import { Router } from 'express';
import { getDashboardStats } from '../controllers/dashboardController.js';
import { protect } from '../middleware/auth.js';
import { authorize } from '../middleware/role.js';

const router = Router();

router.get('/stats', protect, authorize('doctor', 'admin', 'patient'), getDashboardStats);

export default router;