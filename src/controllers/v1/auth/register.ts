import { logger } from '@/lib/winston';
import type { Request, Response } from 'express';

import type { IUser } from '@/models/user';
import User from '@/models/user';
import { genUserName } from '@/utils';
import { generateAccessToken, generateRefreshToken } from '@/lib/jwt';
import Token from '@/models/token';
import config from '@/config';

type UserData = Pick<IUser, 'email' | 'password' | 'role'>;

const register = async (req: Request, res: Response) => {
  const { email, password, role } = req.body as UserData;
  if (role === 'admin' && !config.WHITELIST_ADMINS_MAILS.includes(email)) {
    res.status(403).json({
      code: 'AuthorizationError',
      message: 'You are not allowed to register as an admin',
    });
    logger.warn(`Unauthorized admin registration attempt for email: ${email}`);
    return;
  }
  try {
    const isUserExist = await User.findOne({
      email,
    });
    if (isUserExist) {
      return res.status(400).json({
        code: 'UserExists',
        message: 'User with this email already exists',
      });
    }

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

    const token = new Token({
      userId: newUser._id,
      token: refreshToken,
    });
    await token.save();

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
    });
    logger.info('User registered successfully', newUser.toObject());
  } catch (error) {
    res
      .status(500)
      .json({ code: 'ServerError', message: 'Internal server error', error });
    logger.error('Error in register controller:', error);
  }
};
export default register;
