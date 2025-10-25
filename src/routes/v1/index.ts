import { Router } from 'express';
import authRoutes from '@/routes/v1/auth';

const router = Router();

router.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to API v1' });
});

router.use('/auth', authRoutes);

export default router;
