import { logger } from '@/lib/winston';
import Blog from '@/models/blog';
import { Like } from '@/models/like';

import type { Request, Response } from 'express';

const disLikeBlog = async (req: Request, res: Response) => {
  const { blogId } = req.params;
  const userId = req.userId;

  try {
    const existingLike = await Like.findOne({
      blogId,
      userId,
    });

    if (!existingLike) {
      return res.status(404).json({
        code: 'NotFound',
        message: 'Like not found',
      });
    }

    await Like.deleteOne({
      _id: existingLike._id,
    });

    const blog = await Blog.findById(blogId).select('likesCount');

    if (!blog) {
      return res.status(404).json({
        code: 'NotFound',
        message: 'Blog not found',
      });
    }

    blog.likesCount--;

    await blog.save();

    logger.info('Blog disliked successfully', {
      userId,
      blogId: blog._id,
      likesCount: blog.likesCount,
    });

    res.sendStatus(204);
  } catch (error) {
    logger.error('Error disliking blog', error);

    return res.status(500).json({
      code: 'ServerError',
      message: 'Internal Server Error',
      error: error,
    });
  }
};

export default disLikeBlog;
