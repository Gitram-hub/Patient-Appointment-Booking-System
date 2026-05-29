import { body } from 'express-validator';

export const registerValidator = [
  body('name').trim().isLength({ min: 2 }).withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
];

export const loginValidator = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required')
];

export const doctorProfileValidator = [
  body('specialization').trim().notEmpty().withMessage('Specialization is required')
];

export const slotValidator = [
  body('doctorId').notEmpty().withMessage('Doctor is required'),
  body('date').notEmpty().withMessage('Date is required'),
  body('startTime').notEmpty().withMessage('Start time is required'),
  body('endTime').notEmpty().withMessage('End time is required')
];

export const appointmentValidator = [
  body('doctorId').notEmpty().withMessage('Doctor is required'),
  body('slotId').notEmpty().withMessage('Slot is required'),
  body('date').notEmpty().withMessage('Date is required'),
  body('time').notEmpty().withMessage('Time is required')
];

export const aiChatValidator = [
  body('message').notEmpty().withMessage('Message is required')
];