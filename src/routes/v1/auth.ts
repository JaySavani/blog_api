import { Router } from 'express';
import register from '@/controllers/v1/auth/register';
import validateResource from '@/middlewares/validateResource';
import { Zlogin, ZrefreshToken, Zregister } from '@/schemas/auth';
import login from '@/controllers/v1/auth/login';
import refreshToken from '@/controllers/v1/auth/refresh_token';
import logout from '@/controllers/v1/auth/logout';
import { authenticate } from '@/middlewares/authenticate';
const router = Router();

router.post('/register', validateResource(Zregister), register);
router.post('/login', validateResource(Zlogin), login);
router.post('/refresh-token', validateResource(ZrefreshToken), refreshToken);
router.post('/logout', authenticate, logout);
export default router;
