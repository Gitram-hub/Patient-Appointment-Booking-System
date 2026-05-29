import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema(
  {
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true, index: true },
    slotId: { type: mongoose.Schema.Types.ObjectId, ref: 'AppointmentSlot', required: true, unique: true, index: true },
    date: { type: String, required: true, index: true },
    time: { type: String, required: true },
    status: { type: String, enum: ['pending', 'approved', 'rejected', 'completed', 'cancelled'], default: 'pending', index: true },
    reason: { type: String, default: '' },
    notes: { type: String, default: '' },
    cancelledBy: { type: String, enum: ['patient', 'doctor', 'admin', 'system'], default: 'system' }
  },
  { timestamps: true }
);

appointmentSchema.index({ doctorId: 1, date: 1, time: 1 });
appointmentSchema.index({ patientId: 1, createdAt: -1 });

export const Appointment = mongoose.models.Appointment || mongoose.model('Appointment', appointmentSchema);