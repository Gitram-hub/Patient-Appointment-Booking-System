import { env } from '../server/config/env.js';
import { connectDatabase, disconnectDatabase } from '../server/config/db.js';
import mongoose from 'mongoose';
import { User } from '../server/models/User.js';

console.log('env.mongoUriLoaded:', Boolean(env.mongoUri));
console.log('env.mongoUri (masked):', env.mongoUri ? env.mongoUri.replace(/([^@]{3}).+@/,'$1...@') : '');
console.log('env.jwtSecretSet:', Boolean(env.jwtSecret));

try {
  await connectDatabase();
  const count = await User.countDocuments();
  const one = await User.findOne().select('-password');
  console.log('mongoose.readyState:', mongoose.connection.readyState);
  console.log('userCount:', count);
  console.log('sampleUserEmail:', one ? one.email : 'none');
  await disconnectDatabase();
  process.exit(0);
} catch (err) {
  console.error('DB connect error:', err.message || err);
  process.exit(1);
}
