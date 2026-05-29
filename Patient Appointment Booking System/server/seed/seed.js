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
    { name: 'Dr. Arjun Sharma', email: 'doctor@demo.com', password: doctorPassword, role: 'doctor', phone: '555-1002' },
    { name: 'Admin User', email: 'admin@demo.com', password: adminPassword, role: 'admin', phone: '555-1003' },
    { name: 'Dr. Priya Nair', email: 'priya.nair@demo.com', password: doctorPassword, role: 'doctor', phone: '555-1004' },
    { name: 'Dr. Rahul Mehta', email: 'rahul.mehta@demo.com', password: doctorPassword, role: 'doctor', phone: '555-1005' },
    { name: 'Dr. Ananya Iyer', email: 'ananya.iyer@demo.com', password: doctorPassword, role: 'doctor', phone: '555-1006' }
  ]);

  const doctors = await Doctor.create([
    {
      userId: users[1]._id,
      specialization: 'General Physician',
      experienceYears: 12,
      bio: 'General physician focused on preventive care, first consultation, and symptom triage.',
      consultationFee: 45,
      rating: 4.9,
      languages: ['English', 'Hindi'],
      clinicLocation: 'Downtown Clinic',
      availability: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      qualifications: ['MBBS', 'MD Internal Medicine']
    },
    {
      userId: users[3]._id,
      specialization: 'Cardiologist',
      experienceYears: 10,
      bio: 'Cardiologist helping patients with heart health, hypertension, and follow-up care.',
      consultationFee: 80,
      rating: 4.8,
      languages: ['English', 'Hindi', 'Marathi'],
      clinicLocation: 'City Heart Centre',
      availability: ['Mon', 'Wed', 'Fri'],
      qualifications: ['MBBS', 'MD', 'DM Cardiology']
    },
    {
      userId: users[4]._id,
      specialization: 'Dermatologist',
      experienceYears: 8,
      bio: 'Dermatologist for skin, hair, and allergy-related consultations.',
      consultationFee: 60,
      rating: 4.7,
      languages: ['English', 'Hindi', 'Gujarati'],
      clinicLocation: 'Skin Care Clinic',
      availability: ['Tue', 'Thu', 'Sat'],
      qualifications: ['MBBS', 'MD Dermatology']
    },
    {
      userId: users[5]._id,
      specialization: 'Pediatrician',
      experienceYears: 9,
      bio: 'Pediatrician for child wellness, vaccinations, and routine medical support.',
      consultationFee: 50,
      rating: 4.9,
      languages: ['English', 'Hindi', 'Tamil'],
      clinicLocation: 'Children Health Clinic',
      availability: ['Mon', 'Tue', 'Thu', 'Sat'],
      qualifications: ['MBBS', 'MD Pediatrics']
    }
  ]);

  const today = new Date().toISOString().slice(0, 10);
  await AppointmentSlot.create([
    { doctorId: doctors[0]._id, date: today, startTime: '09:00', endTime: '09:30' },
    { doctorId: doctors[0]._id, date: today, startTime: '10:00', endTime: '10:30' },
    { doctorId: doctors[1]._id, date: today, startTime: '11:00', endTime: '11:30' },
    { doctorId: doctors[1]._id, date: today, startTime: '15:00', endTime: '15:30' },
    { doctorId: doctors[2]._id, date: today, startTime: '12:00', endTime: '12:30' },
    { doctorId: doctors[2]._id, date: today, startTime: '16:00', endTime: '16:30' },
    { doctorId: doctors[3]._id, date: today, startTime: '13:00', endTime: '13:30' },
    { doctorId: doctors[3]._id, date: today, startTime: '17:00', endTime: '17:30' }
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
  console.log('Additional doctor logins: priya.nair@demo.com / Doctor@123, rahul.mehta@demo.com / Doctor@123, ananya.iyer@demo.com / Doctor@123');
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