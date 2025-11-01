import { logger } from '@/lib/winston';
import Blog from '@/models/blog';
import User from '@/models/user';

// Types
import type { Request, Response } from 'express';

const getBlogBySlug = async (req: Request, res: Response) => {
  const userId = req.userId;

  const { slug } = req.params;

  try {
    const user = await User.findById(userId).select('role');

    const blog = await Blog.findOne({ slug })
      .select('-banner.publicId -__v')
      .populate('author', '-createdAt -updatedAt -__v');

    if (!blog) {
      return res.status(404).json({
        code: 'BlogNotFound',
        message: 'Blog not found',
      });
    }

    if (user?.role === 'user' && blog.status === 'draft') {
      logger.warn('A user tried to access a draft blog.', {
        userId,
        blog,
      });

      return res.status(403).json({
        code: 'AuthorizationError',
        message:
          'Access denied. You are not authorized to perform this action.',
      });
    }

    return res.status(200).json({
      blog,
    });
  } catch (error) {
    logger.error('Error fetching blog by slug:', error);

    return res.status(500).json({
      code: 'ServerError',
      message: 'Internal Server Error',
      error,
    });
  }
};

export default getBlogBySlug;
