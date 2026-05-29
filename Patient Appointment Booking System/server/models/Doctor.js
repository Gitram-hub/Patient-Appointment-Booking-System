import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true, index: true },
    specialization: { type: String, required: true, index: true },
    experienceYears: { type: Number, default: 0 },
    bio: { type: String, default: '' },
    consultationFee: { type: Number, default: 0 },
    rating: { type: Number, default: 4.7 },
    languages: [{ type: String }],
    clinicLocation: { type: String, default: '' },
    availability: [{ type: String }],
    qualifications: [{ type: String }] 
  },
  { timestamps: true }
);

doctorSchema.index({ specialization: 1, rating: -1 });

export const Doctor = mongoose.models.Doctor || mongoose.model('Doctor', doctorSchema);