import { Appointment } from '../models/Appointment.js';
import { AppointmentSlot } from '../models/AppointmentSlot.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/apiError.js';

export const bookAppointment = asyncHandler(async (req, res) => {
  const slot = await AppointmentSlot.findById(req.body.slotId);
  if (!slot) throw new ApiError(404, 'Slot not found');

  if (slot.status !== 'available' || slot.bookedCount >= slot.maxBookings) {
    throw new ApiError(409, 'Slot is already booked');
  }

  const existing = await Appointment.findOne({ slotId: slot._id });
  if (existing) throw new ApiError(409, 'Appointment already exists for this slot');

  const appointment = await Appointment.create({
    patientId: req.user.id,
    doctorId: req.body.doctorId,
    slotId: req.body.slotId,
    date: req.body.date,
    time: req.body.time,
    reason: req.body.reason || ''
  });

  slot.bookedCount += 1;
  slot.status = slot.bookedCount >= slot.maxBookings ? 'booked' : slot.status;
  await slot.save();

  res.status(201).json({ success: true, appointment });
});

export const listAppointments = asyncHandler(async (req, res) => {
  const { role, id } = req.user;
  const query = {};
  if (role === 'patient') query.patientId = id;
  if (role === 'doctor') query.doctorId = id;

  const appointments = await Appointment.find(query)
    .populate('patientId', 'name email phone avatarUrl')
    .populate('doctorId')
    .populate('slotId')
    .sort({ createdAt: -1 })
    .lean();

  res.json({ success: true, appointments });
});

export const cancelAppointment = asyncHandler(async (req, res) => {
  const appointment = await Appointment.findById(req.params.id).populate('slotId');
  if (!appointment) throw new ApiError(404, 'Appointment not found');

  appointment.status = 'cancelled';
  appointment.cancelledBy = req.user.role;
  await appointment.save();

  const slot = appointment.slotId;
  if (slot && typeof slot.bookedCount === 'number') {
    slot.bookedCount = Math.max(0, slot.bookedCount - 1);
    slot.status = 'available';
    await slot.save();
  }

  res.json({ success: true, appointment });
});

export const updateAppointmentStatus = asyncHandler(async (req, res) => {
  const appointment = await Appointment.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true, runValidators: true });
  if (!appointment) throw new ApiError(404, 'Appointment not found');
  res.json({ success: true, appointment });
});

export const upcomingAppointments = asyncHandler(async (req, res) => {
  const appointments = await Appointment.find({ patientId: req.user.id, status: { $in: ['pending', 'approved'] } })
    .sort({ createdAt: -1 })
    .populate('doctorId')
    .populate('slotId');
  res.json({ success: true, appointments });
});