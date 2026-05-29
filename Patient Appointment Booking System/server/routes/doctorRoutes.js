import { Router } from 'express';
import { createOrUpdateDoctorProfile, getDoctorById, listDoctors, updateDoctorProfile } from '../controllers/doctorController.js';
import { protect } from '../middleware/auth.js';
import { authorize } from '../middleware/role.js';
import { validate } from '../middleware/validate.js';
import { doctorProfileValidator } from '../validators/schemas.js';

const router = Router();

router.get('/', listDoctors);
router.get('/:id', getDoctorById);
router.post('/profile', protect, authorize('doctor', 'admin'), doctorProfileValidator, validate, createOrUpdateDoctorProfile);
router.patch('/:id', protect, authorize('doctor', 'admin'), doctorProfileValidator, validate, updateDoctorProfile);

export default router;