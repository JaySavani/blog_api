import { authenticate } from '@/middlewares/authenticate';
import { authorize } from '@/middlewares/authorize';
import createBlog from '@/controllers/v1/blog/createBlog';
import { create } from 'domain';
import { Router } from 'express';
import multer from 'multer';
import uploadBlogBanner from '@/middlewares/uploadBlogBanner';
import validateResource from '@/middlewares/validateResource';
import { ZcreateBlog } from '@/schemas/blog';

const router = Router();
const upload = multer();

router.post(
  '/',
  authenticate,
  authorize(['admin', 'user']),
  upload.single('banner_image'),
  validateResource(ZcreateBlog),
  uploadBlogBanner('post'),
  createBlog,
);

export default router;
