import commentBlog from '@/controllers/v1/comment/commentBlog';
import deleteComment from '@/controllers/v1/comment/deleteComment';
import getCommentsByBlog from '@/controllers/v1/comment/getCommentByBlog';
import { authenticate } from '@/middlewares/authenticate';
import { authorize } from '@/middlewares/authorize';
import validateResource from '@/middlewares/validateResource';
import {
  ZcommentBlog,
  ZdeleteComment,
  ZgetCommentsByBlog,
} from '@/schemas/comment';
import { Router } from 'express';

const router = Router();
router.post(
  '/blog/:blogId',
  authenticate,
  authorize(['admin', 'user']),
  validateResource(ZcommentBlog),
  commentBlog,
);

router.get(
  '/blog/:blogId',
  authenticate,
  authorize(['admin', 'user']),
  validateResource(ZgetCommentsByBlog),
  getCommentsByBlog,
);

router.delete(
  '/:commentId',
  authenticate,
  authorize(['admin', 'user']),
  validateResource(ZdeleteComment),
  deleteComment,
);

export default router;
