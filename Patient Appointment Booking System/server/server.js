import { createApp } from './app.js';
import { connectDatabase } from './config/db.js';
import { env } from './config/env.js';
import { seedDemoData } from './seed/seed.js';

const start = async () => {
  await connectDatabase();
  if (!env.mongoUri) {
    await seedDemoData({ disconnect: false });
  }
  const app = createApp();

  app.listen(env.port, () => {
    console.log(`Server running on http://localhost:${env.port}`);
  });
};

start().catch((error) => {
  console.error('Failed to start server', error);
  process.exit(1);
});