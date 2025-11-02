import { v2 as cloudinary } from 'cloudinary';

import { logger } from '@/lib/winston';

import type { Request, Response } from 'express';
import User from '@/models/user';
import Blog from '@/models/blog';

const deleteBlog = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;

    const { blogId } = req.params;

    const user = await User.findById(userId).select('role');

    const blog = await Blog.findById(blogId).select('author banner.publicId');

    if (!blog) {
      return res.status(404).json({
        code: 'NotFound',
        message: 'Blog not found',
      });
    }

    if (blog.author !== userId && user?.role !== 'admin') {
      logger.warn('A user tried to delete a blog without permission.', {
        userId,
      });

      return res.status(403).json({
        code: 'AuthorizationError',
        message:
          'Access denied. You are not authorized to perform this action.',
      });
    }

    await cloudinary.uploader.destroy(blog.banner.publicId);

    logger.info('Blog Banner deleted from cloudinary', {
      publicId: blog.banner.publicId,
    });

    await Blog.deleteOne({ _id: blogId });

    logger.info('Blog deleted successfully', {
      blogId,
    });

    res.sendStatus(204);
  } catch (error) {
    logger.error('Error deleting blog post', error);

    return res.status(500).json({
      code: 'ServerError',
      message: 'Internal Server Error',
      error: error,
    });
  }
};

export default deleteBlog;
