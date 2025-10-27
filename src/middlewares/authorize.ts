import { logger } from '@/lib/winston';
import User from '@/models/user';
import type { Request, Response, NextFunction } from 'express';

export type AuthRole = 'admin' | 'user';

export const authorize = (roles: AuthRole[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.userId;
    try {
      const user = await User.findById(userId).select('role');

      if (!user) {
        return res.status(404).json({
          code: 'NotFound',
          message: 'User not found',
        });
      }

      if (!user || !roles.includes(user.role)) {
        return res.status(403).json({
          code: 'AuthorizationError',
          message: 'Access denied, insufficient permissions',
        });
      }
      next();
    } catch (error) {
      logger.error('Error in authorization middleware:', error);
      return res.status(500).json({
        code: 'InternalServerError',
        message: 'Internal server error',
      });
    }
  };
};
