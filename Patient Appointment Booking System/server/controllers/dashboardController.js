import { Appointment } from '../models/Appointment.js';
import { AppointmentSlot } from '../models/AppointmentSlot.js';
import { Doctor } from '../models/Doctor.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getDashboardStats = asyncHandler(async (_req, res) => {
  const [
    totalAppointments,
    pendingAppointments,
    completedAppointments,
    doctorsCount,
    availableSlots,
    appointments,
    pendingRequests,
    doctors,
    activeSlots
  ] = await Promise.all([
    Appointment.countDocuments(),
    Appointment.countDocuments({ status: 'pending' }),
    Appointment.countDocuments({ status: 'completed' }),
    Doctor.countDocuments(),
    AppointmentSlot.countDocuments({ status: 'available' }),
    Appointment.find()
      .populate('patientId', 'name email phone avatarUrl')
      .populate('doctorId', 'specialization consultationFee rating clinicLocation userId')
      .populate({ path: 'doctorId', populate: { path: 'userId', select: 'name email phone avatarUrl role' } })
      .populate('slotId')
      .sort({ createdAt: -1 })
      .lean(),
    Appointment.find({ status: 'pending' })
      .populate('patientId', 'name email phone avatarUrl')
      .populate('doctorId', 'specialization consultationFee rating clinicLocation userId')
      .populate({ path: 'doctorId', populate: { path: 'userId', select: 'name email phone avatarUrl role' } })
      .populate('slotId')
      .sort({ createdAt: -1 })
      .lean(),
    Doctor.find().populate('userId', 'name email phone avatarUrl role').sort({ rating: -1 }).lean(),
    AppointmentSlot.find({ status: 'available' }).populate({ path: 'doctorId', populate: { path: 'userId', select: 'name email phone avatarUrl role' } }).sort({ date: -1, startTime: 1 }).lean()
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
    stats: {
      totalAppointments,
      pendingAppointments,
      completedAppointments,
      doctorsCount,
      availableSlots,
      todaySchedule,
      monthlyStatistics,
      appointments,
      pendingRequests,
      doctors,
      activeSlots
    }
  });
});