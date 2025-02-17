import { Router } from 'express';
import { login } from '../controllers/auth.controller';
import { fetchSchedule, editSchedule } from '../controllers/schedule.controller';
import { verifyAccess } from '../controllers/access.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

export const router = Router();

router.post('/login', login);
router.get('/schedule', authMiddleware, fetchSchedule);
router.put('/schedule', authMiddleware, editSchedule);
router.get('/check-access', verifyAccess);
