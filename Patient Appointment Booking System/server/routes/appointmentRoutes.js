import { Router } from 'express';
import { bookAppointment, cancelAppointment, listAppointments, upcomingAppointments, updateAppointmentStatus } from '../controllers/appointmentController.js';
import { protect } from '../middleware/auth.js';
import { authorize } from '../middleware/role.js';
import { validate } from '../middleware/validate.js';
import { appointmentValidator } from '../validators/schemas.js';

const router = Router();

router.get('/', protect, listAppointments);
router.get('/upcoming/me', protect, authorize('patient'), upcomingAppointments);
router.post('/', protect, authorize('patient'), appointmentValidator, validate, bookAppointment);
router.patch('/:id/status', protect, authorize('doctor', 'admin'), updateAppointmentStatus);
router.patch('/:id/cancel', protect, authorize('patient', 'doctor', 'admin'), cancelAppointment);

export default router;