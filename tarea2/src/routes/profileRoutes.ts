import { Router } from 'express';
import { getProfile } from '../controllers/profileController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

// La ruta debe ser exactamente '/perfil'
router.get('/perfil', authenticateToken, getProfile);

export default router;