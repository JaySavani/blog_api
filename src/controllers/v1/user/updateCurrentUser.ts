import { logger } from '@/lib/winston';
import User from '@/models/user';
import { Request, Response } from 'express';

const updateCurrentUser = async (req: Request, res: Response) => {
  const userId = req.userId;

  if (!userId) {
    return res.status(400).json({
      code: 'AuthenticationError',
      message: 'User ID is required to update current user information.',
    });
  }

  // Extract user data from request body
  const {
    username,
    email,
    password,
    first_name,
    last_name,
    website,
    facebook,
    instagram,
    linkedin,
    x,
    youtube,
  } = req.body ?? {};

  try {
    const isexistingEmail = await User.findOne({
      email: email?.toLowerCase(),
      _id: { $ne: userId },
    }).exec();

    if (isexistingEmail) {
      return res.status(409).json({
        code: 'Conflict',
        message: 'Email is already in use by another account.',
      });
    }

    const isexistingUsername = await User.findOne({
      username: username,
      _id: { $ne: userId },
    }).exec();
    if (isexistingUsername) {
      return res.status(409).json({
        code: 'Conflict',
        message: 'Username is already in use by another account.',
      });
    }

    const user = await User.findById(userId).select('+password -__v').exec();

    if (!user) {
      return res.status(404).json({
        code: 'NotFound',
        message: 'User not found',
      });
    }

    // Update user fields if provided
    if (username) user.username = username;
    if (email) user.email = email;
    if (password) user.password = password; // Password will be hashed by Mongoose pre-save hook
    if (first_name) user.firstName = first_name;
    if (last_name) user.lastName = last_name;
    if (!user.socialLinks) {
      user.socialLinks = {};
    }
    // Update social links if provided
    if (website) user.socialLinks.website = website;
    if (facebook) user.socialLinks.facebook = facebook;
    if (instagram) user.socialLinks.instagram = instagram;
    if (linkedin) user.socialLinks.linkedin = linkedin;
    if (x) user.socialLinks.x = x;
    if (youtube) user.socialLinks.youtube = youtube;

    // Save the updated user document
    await user.save();
    // Log the successful update
    logger.info(`User updated successfully: ${user}`);

    // Return the updated user information with a 200 OK response
    res.status(200).json({
      code: 'Success',
      user,
    });
  } catch (error) {
    // Log the error for debugging purposes
    logger.error('Error updating user:', error);

    // Return a 500 Internal Server Error response
    return res.status(500).json({
      code: 'ServerError',
      message: 'Internal Server Error',
    });
  }
};

export default updateCurrentUser;
