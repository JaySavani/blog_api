import Blog, { IBlog } from '@/models/blog';
import { Request, Response } from 'express';
import DOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';
import { logger } from '@/lib/winston';

type BlogData = Pick<IBlog, 'title' | 'content' | 'banner' | 'status'>;

// DOMPurify Setup & Purify the content
const window = new JSDOM('').window;
const purify = DOMPurify(window);

const createBlog = async (req: Request, res: Response) => {
  try {
    const { title, content, banner, status } = req.body as BlogData;
    const userId = req.userId;

    // Clean the content using DOMPurify
    const cleanContent = purify.sanitize(content).trim();

    const newBlog = await Blog.create({
      title,
      content: cleanContent,
      banner,
      status,
      author: userId,
    });

    logger.info('Blog created successfully', newBlog);

    return res.status(201).json({
      blog: newBlog,
    });
  } catch (error) {
    logger.error('Error creating blog', error);
    return res.status(500).json({
      code: 'ServerError',
      message: 'Internal Server Error',
    });
  }
};

export default createBlog;
