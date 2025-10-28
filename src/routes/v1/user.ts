import { Router } from 'express';
import { authenticate } from '@/middlewares/authenticate';
import { authorize } from '@/middlewares/authorize';
import getCurrentUser from '@/controllers/v1/user/getCurrentUser';
import updateCurrentUser from '@/controllers/v1/user/updateCurrentUser';
import deleteCurrentUser from '@/controllers/v1/user/deleteCurrentUser';
import validateResource from '@/middlewares/validateResource';
import { ZupdateUser } from '@/schemas/user';
const router = Router();

router.get(
  '/current',
  authenticate,
  authorize(['user', 'admin']),
  getCurrentUser,
);

router.put(
  '/current',
  authenticate,
  authorize(['user', 'admin']),
  validateResource(ZupdateUser),
  updateCurrentUser,
);

router.delete(
  '/current',
  authenticate,
  authorize(['admin', 'user']),
  deleteCurrentUser,
);

export default router;
