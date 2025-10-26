import { Types } from 'mongoose';
import jwt from 'jsonwebtoken';
import config from '@/config';

export const generateAccessToken = (userId: Types.ObjectId): string => {
  const payload = { userId };
  return jwt.sign(payload, config.JWT_ACCESS_TOKEN_SECRET, {
    expiresIn: config.ACCESS_TOKEN_EXPIRY,
    subject: 'accessApi',
  });
};

export const generateRefreshToken = (userId: Types.ObjectId): string => {
  const payload = { userId };
  return jwt.sign(payload, config.JWT_REFRESH_TOKEN_SECRET, {
    expiresIn: config.REFRESH_TOKEN_EXPIRY,
    subject: 'refreshToken',
  });
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, config.JWT_ACCESS_TOKEN_SECRET as string);
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, config.JWT_REFRESH_TOKEN_SECRET as string);
};
