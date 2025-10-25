import { logger } from '@/lib/winston';
import type { Request, Response } from 'express';

import type { IUser } from '@/models/user';
import User from '@/models/user';
import { genUserName } from '@/utils';
import { generateAccessToken, generateRefreshToken } from '@/lib/jwt';

type UserData = Pick<IUser, 'email' | 'password' | 'role'>;

const register = async (req: Request, res: Response) => {
  const { email, password, role } = req.body as UserData;
  try {
    const username = genUserName();
    const newUser = new User({
      username,
      email,
      password,
      role,
    });

    await newUser.save();

    const accessToken = generateAccessToken(newUser._id);
    const refreshToken = generateRefreshToken(newUser._id);

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    res.status(201).json({
      user: {
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
      },
      accessToken,
      refreshToken,
    });
    logger.info('User registered successfully', newUser);
  } catch (error) {
    res
      .status(500)
      .json({ code: 'ServerError', message: 'Internal server error', error });
    logger.error('Error in register controller:', error);
  }
};
export default register;
