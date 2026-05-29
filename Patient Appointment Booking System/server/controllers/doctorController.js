import { Doctor } from '../models/Doctor.js';
import { User } from '../models/User.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/apiError.js';

export const listDoctors = asyncHandler(async (req, res) => {
  const { q = '', specialization = '' } = req.query;
  const filters = {};
  if (specialization) filters.specialization = new RegExp(String(specialization), 'i');

  const doctors = await Doctor.find(filters).populate('userId', 'name email phone avatarUrl role').sort({ rating: -1 }).lean();
  const searchTerm = String(q).toLowerCase();
  const filtered = searchTerm
    ? doctors.filter((doctor) => {
        const name = doctor.userId?.name?.toLowerCase() || '';
        return name.includes(searchTerm) || doctor.specialization.toLowerCase().includes(searchTerm) || (doctor.clinicLocation || '').toLowerCase().includes(searchTerm);
      })
    : doctors;

  res.json({ success: true, doctors: filtered });
});

export const getDoctorById = asyncHandler(async (req, res) => {
  const doctor = await Doctor.findById(req.params.id).populate('userId', 'name email phone avatarUrl role').lean();
  if (!doctor) throw new ApiError(404, 'Doctor not found');
  res.json({ success: true, doctor });
});

export const createOrUpdateDoctorProfile = asyncHandler(async (req, res) => {
  const targetUserId = req.body.userId || req.user.id;
  const user = await User.findById(targetUserId);
  if (!user) throw new ApiError(404, 'User not found');

  user.role = 'doctor';
  await user.save();

  const doctor = await Doctor.findOneAndUpdate({ userId: targetUserId }, { userId: targetUserId, ...req.body }, { upsert: true, new: true, runValidators: true }).populate('userId', 'name email phone avatarUrl role');
  res.json({ success: true, doctor });
});

export const updateDoctorProfile = asyncHandler(async (req, res) => {
  const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).populate('userId', 'name email phone avatarUrl role');
  if (!doctor) throw new ApiError(404, 'Doctor not found');
  res.json({ success: true, doctor });
});