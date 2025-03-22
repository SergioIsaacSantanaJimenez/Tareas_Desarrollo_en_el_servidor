import { Router } from 'express';
import { register, login, getProfile } from '../controllers/authController';
import { protect } from '../middleware/authMiddleware';

const router = Router();

// Rutas públicas
router.post('/registro', register);
router.post('/login', login);

// Rutas protegidas
router.get('/perfil', protect, getProfile);

export default router;