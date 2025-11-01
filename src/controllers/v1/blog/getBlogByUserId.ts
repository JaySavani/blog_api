import config from '@/config';
import { logger } from '@/lib/winston';
import Blog from '@/models/blog';
import User from '@/models/user';
import { Request, Response } from 'express';

interface QueryType {
  status?: 'draft' | 'published';
}

const getBlogsByUser = async (req: Request, res: Response) => {
  const userId = req.params.userId;

  const currentUserId = req.userId;
  try {
    const limit = parseInt(
      (req.query.limit as string) || config.DefaultResLimit,
    );
    const offset = parseInt(
      (req.query.offset as string) || config.DefaultResOffset,
    );

    const currentUser = await User.findById(currentUserId).select('role');

    const query: QueryType = {};

    if (currentUser?.role === 'user') {
      query.status = 'published';
    }

    const total = await Blog.countDocuments({ author: userId, ...query });

    const blogs = await Blog.find({ author: userId, ...query })
      .select('-banner.publicId -__v')
      .populate('author', '-createdAt -updatedAt -__v')
      .limit(limit)
      .skip(offset)
      .sort({ createdAt: -1 });

    return res.status(200).json({
      limit,
      offset,
      total,
      blogs,
    });
  } catch (error) {
    logger.error('Error fetching blogs by user:', error);

    return res.status(500).json({
      code: 'ServerError',
      message: 'Internal Server Error',
      error,
    });
  }
};

export default getBlogsByUser;
