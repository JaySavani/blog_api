import dotenv from 'dotenv';

dotenv.config();

const config = {
  port: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV,
  WHITELISTED_ORIGINS: (process.env.WHITELISTED_ORIGINS || '')
    .split(',')
    .map((origin) => origin.trim()),
  MONGODB_URI: process.env.MONGODB_URI!,
};

export default config;
