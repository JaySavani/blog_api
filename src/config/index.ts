import dotenv from 'dotenv';
import ms from 'ms';
dotenv.config();

const config = {
  port: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV,
  WHITELISTED_ORIGINS: (process.env.WHITELISTED_ORIGINS || '')
    .split(',')
    .map((origin) => origin.trim()),
  MONGODB_URI: process.env.MONGODB_URI!,
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',
  JWT_ACCESS_TOKEN_SECRET: process.env.JWT_ACCESS_TOKEN_SECRET!,
  JWT_REFRESH_TOKEN_SECRET: process.env.JWT_REFRESH_TOKEN_SECRET!,
  ACCESS_TOKEN_EXPIRY: process.env.ACCESS_TOKEN_EXPIRY as ms.StringValue,
  REFRESH_TOKEN_EXPIRY: process.env.REFRESH_TOKEN_EXPIRY as ms.StringValue,
  WHITELIST_ADMINS_MAILS: [
    'johnw@gmail.com',
    'admin1@gmail.com',
    'admin2@gmail.com',
  ],
  DefaultResLimit: process.env.DefaultResLimit!,
  DefaultResOffset: process.env.DefaultResOffset!,
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME!,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY!,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET!,
};

export default config;
