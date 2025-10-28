import config from '@/config';
import { logger } from '@/lib/winston';
import User from '@/models/user';
import { Request, Response } from 'express';

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const limit = parseInt(
      (req.query.limit as string) || config.DefaultResLimit,
    );
    const offset = parseInt(
      (req.query.offset as string) || config.DefaultResOffset,
    );

    const users = await User.find().select('-__v').limit(limit).skip(offset);
    const total = await User.countDocuments();

    return res.status(200).json({
      limit,
      offset,
      total,
      users,
    });
  } catch (error) {
    logger.error('Error getting all users:', error);

    return res.status(500).json({
      code: 'ServerError',
      message: 'Internal Server Error',
    });
  }
};

export default getAllUsers;
