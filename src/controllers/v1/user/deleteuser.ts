import { logger } from '@/lib/winston';
import User from '@/models/user';
import { Request, Response } from 'express';

const deleteUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const user = await User.deleteOne({ _id: userId });
    if (!user.deletedCount) {
      return res.status(404).json({
        code: 'NotFound',
        message: 'User not found',
      });
    }

    return res.sendStatus(204);
  } catch (error) {
    logger.error('Error while delete user', error);
    return res.status(500).json({
      code: 'ServerError',
      message: 'Internal server error',
    });
  }
};

export default deleteUser;
