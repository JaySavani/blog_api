import config from '@/config';
import { logger } from '@/lib/winston';
import Blog from '@/models/blog';
import User from '@/models/user';
import { Request, Response } from 'express';

interface QueryType {
  status?: 'draft' | 'published';
}

const getAllBlogs = async (req: Request, res: Response) => {
  const userId = req.userId;

  try {
    const limit = parseInt(
      (req.query.limit as string) || config.DefaultResLimit,
    );
    const offset = parseInt(
      (req.query.offset as string) || config.DefaultResOffset,
    );

    const user = await User.findById(userId).select('role');

    const query: QueryType = {};
    if (user?.role === 'user') {
      query.status = 'published';
    }

    const blogs = await Blog.find(query)
      .select('-banner.publicId -__v') // Exclude version from the response
      .populate('author', '-createdAt -updatedAt -__v -role')
      .skip(offset)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Blog.countDocuments(query);

    return res.status(200).json({
      limit,
      offset,
      total,
      blogs,
    });
  } catch (error) {
    logger.error('Error while get Blogs');
    return res.status(500).json({
      code: 'ServerError',
      message: 'Internal Server Error',
    });
  }
};

export default getAllBlogs;
