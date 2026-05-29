import mongoose from 'mongoose';

const appointmentSlotSchema = new mongoose.Schema(
  {
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true, index: true },
    date: { type: String, required: true, index: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    status: { type: String, enum: ['available', 'booked', 'blocked'], default: 'available', index: true },
    maxBookings: { type: Number, default: 1 },
    bookedCount: { type: Number, default: 0 }
  },
  { timestamps: true }
);

appointmentSlotSchema.index({ doctorId: 1, date: 1, startTime: 1, endTime: 1 }, { unique: true });

export const AppointmentSlot = mongoose.models.AppointmentSlot || mongoose.model('AppointmentSlot', appointmentSlotSchema);