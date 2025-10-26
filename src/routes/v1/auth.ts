import { Router } from 'express';
import register from '@/controllers/v1/auth/register';
import validateResource from '@/middlewares/validateResource';
import { Zlogin, ZrefreshToken, Zregister } from '@/schemas/auth';
import login from '@/controllers/v1/auth/login';
import refreshToken from '@/controllers/v1/auth/refresh_token';
const router = Router();

router.post('/register', validateResource(Zregister), register);
router.post('/login', validateResource(Zlogin), login);
router.post('/refresh-token', validateResource(ZrefreshToken), refreshToken);

export default router;
