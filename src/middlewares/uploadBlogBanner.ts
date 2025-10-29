import uploadToCloudinary from '@/lib/cloudinary';
import { logger } from '@/lib/winston';
import Blog from '@/models/blog';
import { UploadApiErrorResponse } from 'cloudinary';
import { NextFunction, Request, Response } from 'express';

const MAX_BANNER_SIZE = 2 * 1024 * 1024; // 2 MB

const uploadBlogBanner = (method: 'post' | 'put') => {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (method === 'put' && !req.file) {
      return next();
    }
    if (!req.file) {
      return res.status(400).json({
        code: 'ValidationError',
        message: 'Banner image is required',
      });
    }
    if (req.file.size > MAX_BANNER_SIZE) {
      return res.status(413).json({
        code: 'ValidationError',
        message: 'Banner image size must be less than 2MB',
      });
    }

    try {
      const { blogId } = req.params;
      const blog = await Blog.findById(blogId).select('banner.publicId').exec();

      // Upload the file to Cloudinary
      const data = await uploadToCloudinary(
        req.file.buffer,
        blog?.banner.publicId.replace('blog-api/', ''),
      );

      if (!data) {
        logger.error('Error uploading file to Cloudinary.', {
          blogId,
          publicId: blog?.banner.publicId,
        });

        return res.status(500).json({
          code: 'ServerError',
          message: 'Error uploading file to Cloudinary.',
        });
      }

      const newBanner = {
        url: data.secure_url,
        publicId: data.public_id,
        width: data.width,
        height: data.height,
      };

      logger.info('File uploaded to Cloudinary.', {
        blogId,
        banner: newBanner,
      });

      req.body.banner = newBanner;

      next();
    } catch (error: UploadApiErrorResponse | any) {
      logger.error('Error uploading banner to Cloudinary.', error);

      return res.status(error.http_code).json({
        code: error.http_code < 500 ? 'ValidationError' : error.name,
        message: error.message,
      });
    }
  };
};
export default uploadBlogBanner;
