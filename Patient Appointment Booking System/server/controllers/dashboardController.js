import { Appointment } from '../models/Appointment.js';
import { AppointmentSlot } from '../models/AppointmentSlot.js';
import { Doctor } from '../models/Doctor.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getDashboardStats = asyncHandler(async (_req, res) => {
  const [totalAppointments, pendingAppointments, completedAppointments, doctorsCount, availableSlots] = await Promise.all([
    Appointment.countDocuments(),
    Appointment.countDocuments({ status: 'pending' }),
    Appointment.countDocuments({ status: 'completed' }),
    Doctor.countDocuments(),
    AppointmentSlot.countDocuments({ status: 'available' })
  ]);

  const today = new Date().toISOString().slice(0, 10);
  const todaySchedule = await Appointment.find({ date: today }).populate('doctorId').populate('patientId').sort({ time: 1 });

  const monthlyStatistics = await Appointment.aggregate([
    {
      $group: {
        _id: { $substr: ['$createdAt', 0, 7] },
        count: { $sum: 1 }
      }
    },
    { $sort: { _id: 1 } }
  ]);

  res.json({
    success: true,
    stats: { totalAppointments, pendingAppointments, completedAppointments, doctorsCount, availableSlots, todaySchedule, monthlyStatistics }
  });
});