import DOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

import { logger } from '@/lib/winston';

import type { Request, Response } from 'express';
import { Comment, IComment } from '@/models/comment';
import Blog from '@/models/blog';

type CommentData = Pick<IComment, 'content'>;

const window = new JSDOM('').window;
const purify = DOMPurify(window);

const commentBlog = async (req: Request, res: Response): Promise<void> => {
  const { blogId } = req.params;
  const { content } = req.body as CommentData;
  const userId = req.userId;

  try {
    const blog = await Blog.findById(blogId).select('_id commentsCount').exec();

    if (!blog) {
      res.status(404).json({
        code: 'NotFound',
        message: 'Blog not found',
      });
      return;
    }

    const cleanContent = purify.sanitize(content);

    const newComment = await Comment.create({
      blogId,
      content: cleanContent,
      userId,
    });

    logger.info('Comment created successfully', newComment);

    blog.commentsCount++;

    await blog.save();

    logger.info('Blog comments count updated', {
      blogId: blog._id,
      commentsCount: blog.commentsCount,
    });

    res.status(201).json({
      comment: newComment,
    });
  } catch (error) {
    logger.error('Error during commenting in the blog', error);

    res.status(500).json({
      code: 'ServerError',
      message: 'Internal Server Error',
      error: error,
    });
  }
};

export default commentBlog;
