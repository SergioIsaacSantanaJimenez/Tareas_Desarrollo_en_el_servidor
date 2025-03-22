// En userRoutes.ts
import { Router } from 'express';
import {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser
} from '../controllers/userController';
import { protect } from '../middleware/authMiddleware';
import { restrictTo } from '../middleware/roleMiddleware';

const router = Router();

// Aplica primero el middleware protect
router.use(protect);

// Después aplica la restricción de rol para todas las rutas
router.use(restrictTo('admin'));

router.route('/')
  .post(createUser)
  .get(getUsers);

router.route('/:id')
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);

export default router;