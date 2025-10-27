import { Router } from 'express';
import authRoutes from '@/routes/v1/auth';
import userRoutes from '@/routes/v1/user';

const router = Router();

router.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to API v1' });
});

router.use('/auth', authRoutes);
router.use('/users', userRoutes);

export default router;
