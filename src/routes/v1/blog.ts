import { authenticate } from '@/middlewares/authenticate';
import { authorize } from '@/middlewares/authorize';
import createBlog from '@/controllers/v1/blog/createBlog';
import { create } from 'domain';
import { Router } from 'express';
import multer from 'multer';
import uploadBlogBanner from '@/middlewares/uploadBlogBanner';
import validateResource from '@/middlewares/validateResource';
import {
  getAllBlog,
  ZcreateBlog,
  ZgetBlogBySlug,
  ZgetBlogsByUser,
  ZupdateBlog,
} from '@/schemas/blog';
import getAllBlogs from '@/controllers/v1/blog/getAllBlogs';
import getBlogsByUser from '@/controllers/v1/blog/getBlogByUserId';
import getBlogBySlug from '@/controllers/v1/blog/getBlogBySlug';
import updateBlog from '@/controllers/v1/blog/updateBlog';

const router = Router();
const upload = multer();

router.post(
  '/',
  authenticate,
  authorize(['admin']),
  upload.single('banner_image'),
  validateResource(ZcreateBlog),
  uploadBlogBanner('post'),
  createBlog,
);

router.get(
  '/',
  authenticate,
  authorize(['admin', 'user']),
  validateResource(getAllBlog),
  getAllBlogs,
);

router.get(
  '/user/:userId',
  authenticate,
  authorize(['admin', 'user']),
  validateResource(ZgetBlogsByUser),
  getBlogsByUser,
);

router.get(
  '/:slug',
  authenticate,
  authorize(['admin', 'user']),
  validateResource(ZgetBlogBySlug),
  getBlogBySlug,
);

router.put(
  '/:blogId',
  authenticate,
  authorize(['admin']),
  upload.single('banner_image'),
  validateResource(ZupdateBlog),
  uploadBlogBanner('put'),
  updateBlog,
);

export default router;
