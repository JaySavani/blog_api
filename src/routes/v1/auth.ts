import { Router } from 'express';
import register from '@/controllers/v1/auth/register';
import validateResource from '@/middlewares/validateResource';
import { Zlogin, Zregister } from '@/schemas/auth';
import login from '@/controllers/v1/auth/login';
const router = Router();

router.post('/register', validateResource(Zregister), register);
router.post('/login', validateResource(Zlogin), login);

export default router;
