import { logger } from '@/lib/winston';
import User from '@/models/user';
import { Request, Response } from 'express';

const deleteCurrentUser = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;

    await User.deleteOne({
      _id: userId,
    });

    logger.info('user account has been deleted');

    res.sendStatus(204);
  } catch (error) {
    logger.error('Error while delete current user', error);
    return res.status(500).json({
      code: 'ServerError',
      message: 'Internal Server Error',
    });
  }
};

export default deleteCurrentUser;
