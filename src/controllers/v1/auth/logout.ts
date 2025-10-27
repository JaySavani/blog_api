import { logger } from '@/lib/winston';
import Token from '@/models/token';
import { Request, Response } from 'express';

const logout = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies.refreshToken as string;
    if (refreshToken) {
      const del = await Token.deleteOne({ token: refreshToken });
      console.log(del);
      res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      });
      res.sendStatus(204);
      logger.info('User logged out successfully', { userId: req.userId });
    }
  } catch (error) {
    logger.error('Error during logout', error);
    res.status(500).json({
      code: 'InternalServerError',
      message: 'An unexpected error occurred during logout.',
    });
  }
};

export default logout;
