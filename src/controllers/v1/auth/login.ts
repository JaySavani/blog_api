import { logger } from '@/lib/winston';
import type { Request, Response } from 'express';

import type { IUser } from '@/models/user';
import User from '@/models/user';
import { generateAccessToken, generateRefreshToken } from '@/lib/jwt';
import Token from '@/models/token';

type UserData = Pick<IUser, 'email' | 'password'>;

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body as UserData;

  try {
    const user = await User.findOne({
      email,
    }).select('email username password role');

    if (!user) {
      return res.status(400).json({
        code: 'InvalidCredentials',
        message: 'Invalid email or password',
      });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(400).json({
        code: 'InvalidCredentials',
        message: 'Invalid email or password',
      });
    }
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    const token = new Token({
      userId: user._id,
      token: refreshToken,
    });
    await token.save();

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    res.status(200).json({
      user: {
        username: user.username,
        email: user.email,
        role: user.role,
      },
      accessToken,
    });

    logger.info('User logged in successfully', user.toObject());
  } catch (error) {
    res
      .status(500)
      .json({ code: 'ServerError', message: 'Internal server error', error });
    logger.error('Error in login controller:', error);
  }
};
export default login;
