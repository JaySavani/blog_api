import { logger } from '@/lib/winston';
import User from '@/models/user';
import { Request, Response } from 'express';

const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).select('-__v');
    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ code: 'ServerError', message: 'Internal server error' });
    logger.error('Error in getCurrentUser controller:', error);
  }
};

export default getCurrentUser;
