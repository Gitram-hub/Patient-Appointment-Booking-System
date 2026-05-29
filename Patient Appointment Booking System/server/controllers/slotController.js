import { AppointmentSlot } from '../models/AppointmentSlot.js';
import { Doctor } from '../models/Doctor.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/apiError.js';

export const listSlots = asyncHandler(async (req, res) => {
  const { doctorId, date } = req.query;
  const query = {};
  if (doctorId) query.doctorId = doctorId;
  if (date) query.date = date;
  const slots = await AppointmentSlot.find(query).sort({ date: 1, startTime: 1 }).lean();
  res.json({ success: true, slots });
});

export const createSlot = asyncHandler(async (req, res) => {
  const doctor = await Doctor.findById(req.body.doctorId);
  if (!doctor) throw new ApiError(404, 'Doctor not found');
  const slot = await AppointmentSlot.create(req.body);
  res.status(201).json({ success: true, slot });
});

export const updateSlot = asyncHandler(async (req, res) => {
  const slot = await AppointmentSlot.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!slot) throw new ApiError(404, 'Slot not found');
  res.json({ success: true, slot });
});

export const deleteSlot = asyncHandler(async (req, res) => {
  const slot = await AppointmentSlot.findByIdAndDelete(req.params.id);
  if (!slot) throw new ApiError(404, 'Slot not found');
  res.json({ success: true, message: 'Slot deleted' });
});