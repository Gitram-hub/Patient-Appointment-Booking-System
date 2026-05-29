import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { env } from './env.js';

let memoryServer = null;

export const connectDatabase = async () => {
  const uri = env.mongoUri || (await getMemoryUri());
  const options = env.mongoDbName ? { dbName: env.mongoDbName } : undefined;
  await mongoose.connect(uri, options);
};

const getMemoryUri = async () => {
  if (!memoryServer) {
    memoryServer = await MongoMemoryServer.create();
  }
  return memoryServer.getUri();
};

export const disconnectDatabase = async () => {
  await mongoose.disconnect();
  if (memoryServer) {
    await memoryServer.stop();
    memoryServer = null;
  }
};