import dotenv from 'dotenv';

dotenv.config();

const config = {
  port: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV,
  WHITELISTED_ORIGINS: (process.env.WHITELISTED_ORIGINS || '')
    .split(',')
    .map((origin) => origin.trim()),
  MONGODB_URI: process.env.MONGODB_URI!,
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',
};

export default config;
