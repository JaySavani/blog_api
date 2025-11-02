import DOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

import { logger } from '@/lib/winston';

import type { Request, Response } from 'express';
import { IBlog } from '@/models/blog';
import User from '@/models/user';
import Blog from '@/models/blog';

type BlogData = Partial<Pick<IBlog, 'title' | 'content' | 'banner' | 'status'>>;

const window = new JSDOM('').window;
const purify = DOMPurify(window);

const updateBlog = async (req: Request, res: Response) => {
  try {
    const { title, content, banner, status } = req.body as BlogData;

    const userId = req.userId;

    const { blogId } = req.params;

    const user = await User.findById(userId).select('role');

    const blog = await Blog.findById(blogId).select('-__v');

    if (!blog) {
      return res.status(404).json({
        code: 'NotFound',
        message: 'Blog not found',
      });
    }

    if (blog.author !== userId && user?.role !== 'admin') {
      logger.warn('A user tried to update a blog without permission', {
        userId,
        blog,
      });

      return res.status(403).json({
        code: 'AuthorizationError',
        message:
          'Access denied. You are not authorized to perform this action.',
      });
    }

    if (title) blog.title = title;

    if (content) {
      const cleanContent = purify.sanitize(content).trim();
      blog.content = cleanContent;
    }
    if (banner) blog.banner = banner;
    if (status) blog.status = status;

    await blog.save();

    logger.info('Blog updated successfully', blog.toJSON());

    res.status(200).json({
      blog,
    });
  } catch (error) {
    logger.error('Error updating blog post', error);

    return res.status(500).json({
      code: 'ServerError',
      message: 'Internal Server Error',
      error: error,
    });
  }
};

export default updateBlog;
