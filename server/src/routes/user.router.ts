import { Router } from 'express';

import { userController } from '../controllers';
import { authMiddleware } from '../middlewares';

const router = Router();

router.get(
    '/:email',
    authMiddleware.checkIsUserAuth,
    userController.getUserByEmail,
);
router.get('/', userController.getUsers);
router.post('/', userController.createUser);

export const userRouter = router;
