import bcrypt from 'bcryptjs';
import { connectDatabase, disconnectDatabase } from '../config/db.js';
import { User } from '../models/User.js';
import { Doctor } from '../models/Doctor.js';
import { AppointmentSlot } from '../models/AppointmentSlot.js';
import { AIKnowledgeBase } from '../models/AIKnowledgeBase.js';

export const seedDemoData = async ({ disconnect = true } = {}) => {

  await Promise.all([
    User.deleteMany({}),
    Doctor.deleteMany({}),
    AppointmentSlot.deleteMany({}),
    AIKnowledgeBase.deleteMany({})
  ]);

  const patientPassword = await bcrypt.hash('Patient@123', 12);
  const doctorPassword = await bcrypt.hash('Doctor@123', 12);
  const adminPassword = await bcrypt.hash('Admin@123', 12);

  const users = await User.create([
    { name: 'Ava Patient', email: 'patient@demo.com', password: patientPassword, role: 'patient', phone: '555-1001' },
    { name: 'Dr. Sofia Carter', email: 'doctor@demo.com', password: doctorPassword, role: 'doctor', phone: '555-1002' },
    { name: 'Admin User', email: 'admin@demo.com', password: adminPassword, role: 'admin', phone: '555-1003' }
  ]);

  const doctor = await Doctor.create({
    userId: users[1]._id,
    specialization: 'General Physician',
    experienceYears: 12,
    bio: 'General physician with a focus on preventive care and symptom triage.',
    consultationFee: 45,
    rating: 4.9,
    languages: ['English', 'Spanish'],
    clinicLocation: 'Downtown Clinic',
    availability: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    qualifications: ['MBBS', 'MD Internal Medicine']
  });

  const today = new Date().toISOString().slice(0, 10);
  await AppointmentSlot.create([
    { doctorId: doctor._id, date: today, startTime: '09:00', endTime: '09:30' },
    { doctorId: doctor._id, date: today, startTime: '10:00', endTime: '10:30' },
    { doctorId: doctor._id, date: today, startTime: '11:00', endTime: '11:30' }
  ]);

  await AIKnowledgeBase.create([
    {
      title: 'Fever care guidance',
      content: 'Fever lasting more than 48 hours, breathing difficulty, or dehydration should be reviewed by a physician promptly.',
      sourceType: 'faq',
      tags: ['fever', 'triage', 'general medicine']
    },
    {
      title: 'Appointment checklist',
      content: 'Bring a government ID, prior medical reports, current medication list, and insurance details if available.',
      sourceType: 'instruction',
      tags: ['documents', 'appointments', 'faq']
    }
  ]);

  console.log('Seed completed');
  console.log('Patient login: patient@demo.com / Patient@123');
  console.log('Doctor login: doctor@demo.com / Doctor@123');
  console.log('Admin login: admin@demo.com / Admin@123');

  if (disconnect) {
    await disconnectDatabase();
  }
};

const shouldRunStandalone = process.argv[1] && process.argv[1].endsWith('seed.js');

if (shouldRunStandalone) {
  connectDatabase()
    .then(() => seedDemoData({ disconnect: true }))
    .catch(async (error) => {
      console.error(error);
      await disconnectDatabase();
      process.exit(1);
    });
}