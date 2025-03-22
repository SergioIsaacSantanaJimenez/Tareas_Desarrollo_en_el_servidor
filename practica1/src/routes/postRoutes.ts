import { Router } from 'express';
import { createPost, getPosts } from '../controllers/postController';
import { protect } from '../middleware/authMiddleware';

const router = Router();

// Todas las rutas de publicaciones están protegidas
router.use(protect);

router.route('/')
  .post(createPost)
  .get(getPosts);

export default router;