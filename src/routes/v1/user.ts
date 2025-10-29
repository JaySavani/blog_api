import { Router } from 'express';
import { authenticate } from '@/middlewares/authenticate';
import { authorize } from '@/middlewares/authorize';
import getCurrentUser from '@/controllers/v1/user/getCurrentUser';
import updateCurrentUser from '@/controllers/v1/user/updateCurrentUser';
import deleteCurrentUser from '@/controllers/v1/user/deleteCurrentUser';
import deleteUser from '@/controllers/v1/user/deleteuser';
import validateResource from '@/middlewares/validateResource';
import {
  ZdeleteUser,
  ZgetAllUsers,
  ZgetUser,
  ZupdateUser,
} from '@/schemas/user';
import getAllUsers from '@/controllers/v1/user/getAllUsers';
import getUser from '@/controllers/v1/user/getUser';
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

router.get(
  '/',
  authenticate,
  authorize(['admin']),
  validateResource(ZgetAllUsers),
  getAllUsers,
);

router.get(
  '/:userId',
  authenticate,
  authorize(['admin']),
  validateResource(ZgetUser),
  getUser,
);

router.delete(
  '/:userId',
  authenticate,
  authorize(['admin']),
  validateResource(ZdeleteUser),
  deleteUser,
);

export default router;
