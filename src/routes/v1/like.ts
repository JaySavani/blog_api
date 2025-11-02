import disLikeBlog from '@/controllers/v1/likes/disLikeBlog';
import likeBlog from '@/controllers/v1/likes/likeBlog';
import { authenticate } from '@/middlewares/authenticate';
import { authorize } from '@/middlewares/authorize';
import validateResource from '@/middlewares/validateResource';
import { ZdisLikeBlog, ZlikeBlog } from '@/schemas/like';
import { Router } from 'express';

const router = Router();

// Routes
router.post(
  '/blog/:blogId',
  authenticate,
  authorize(['admin', 'user']),
  validateResource(ZlikeBlog),
  likeBlog,
);

router.delete(
  '/blog/:blogId',
  authenticate,
  authorize(['admin', 'user']),
  validateResource(ZdisLikeBlog),
  disLikeBlog,
);

export default router;
