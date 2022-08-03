import { Router } from 'express';

import { authController } from '../controllers';
import { authMiddleware } from '../middlewares';

const router = Router();

router.post('/registration', authMiddleware.checkIsUserExists, authController.registration);
router.post('/login', authController.login);

export const authRouter = router;
