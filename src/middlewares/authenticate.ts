import { verifyAccessToken } from '@/lib/jwt';
import { logger } from '@/lib/winston';
import { NextFunction, Request, Response } from 'express';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import { Types } from 'mongoose';

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      code: 'AuthenticationError',
      message: 'Token not provided or malformed.',
    });
  }
  const token = authHeader.split(' ')[1];

  try {
    const jwtPayload = verifyAccessToken(token) as { userId: Types.ObjectId };

    req.userId = jwtPayload.userId;
    next();
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return res.status(401).json({
        code: 'AuthenticationError',
        message: 'Access token has expired. Request a new token.',
      });
    }
    if (error instanceof JsonWebTokenError) {
      return res.status(401).json({
        code: 'AuthenticationError',
        message: 'Invalid access token.',
      });
    }
    logger.error('Error occurred during authentication', error);
    return res.status(500).json({
      code: 'InternalServerError',
      message: 'An unexpected error occurred during authentication.',
    });
  }

  // Authentication logic here
};
