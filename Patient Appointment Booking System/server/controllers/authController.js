import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { ApiError } from '../utils/apiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { env } from '../config/env.js';

const createToken = (user) => jwt.sign({ id: user._id.toString(), role: user.role, email: user.email, name: user.name }, env.jwtSecret, { expiresIn: env.jwtExpiresIn });

export const register = asyncHandler(async (req, res) => {
  const { name, email, password, phone, role = 'patient' } = req.body;
  const existing = await User.findOne({ email });
  if (existing) throw new ApiError(409, 'User already exists');

  const hashed = await bcrypt.hash(password, 12);
  const user = await User.create({ name, email, password: hashed, phone, role });
  const token = createToken(user);

  res.status(201).json({
    success: true,
    token,
    user: { id: user._id, name: user.name, email: user.email, role: user.role, phone: user.phone, avatarUrl: user.avatarUrl }
  });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select('+password');
  if (!user) throw new ApiError(401, 'Invalid credentials');

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new ApiError(401, 'Invalid credentials');

  const token = createToken(user);
  res.json({
    success: true,
    token,
    user: { id: user._id, name: user.name, email: user.email, role: user.role, phone: user.phone, avatarUrl: user.avatarUrl }
  });
});

export const me = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) throw new ApiError(404, 'User not found');

  res.json({
    success: true,
    user: { id: user._id, name: user.name, email: user.email, role: user.role, phone: user.phone, avatarUrl: user.avatarUrl }
  });
});