import { logger } from '@/lib/winston';
import User from '@/models/user';
import { Request, Response } from 'express';

const getUser = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  try {
    const user = await User.findById(userId).select('-__v');
    if (!user) {
      return res.status(404).json({
        code: 'NotFound',
        message: 'User not found',
      });
    }
    return res.status(200).json({
      user,
    });
  } catch (error) {
    logger.error('Error while get user', error);
    return res.status(500).json({
      code: 'ServerError',
      message: 'Internal server error',
    });
  }
};

export default getUser;
