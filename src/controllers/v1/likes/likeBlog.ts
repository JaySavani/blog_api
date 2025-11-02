import { logger } from '@/lib/winston';
import Blog from '@/models/blog';
import { Like } from '@/models/like';

import type { Request, Response } from 'express';

const likeBlog = async (req: Request, res: Response) => {
  const { blogId } = req.params;
  const userId = req.userId;

  try {
    const blog = await Blog.findById(blogId).select('likesCount');

    if (!blog) {
      return res.status(404).json({
        code: 'NotFound',
        message: 'Blog not found',
      });
    }

    const existingLike = await Like.findOne({
      blogId,
      userId,
    });

    if (existingLike) {
      return res.status(400).json({
        code: 'BadRequest',
        message: 'You have already liked this blog',
      });
    }

    await Like.create({
      blogId,
      userId,
    });

    blog.likesCount++;

    await blog.save();

    logger.info('Blog liked successfully', {
      userId,
      blogId: blog._id,
      likesCount: blog.likesCount,
    });

    res.status(200).json({
      likesCount: blog.likesCount,
    });
  } catch (error) {
    logger.error('Error liking blog', error);

    return res.status(500).json({
      code: 'ServerError',
      message: 'Internal Server Error',
      error: error,
    });
  }
};

export default likeBlog;
