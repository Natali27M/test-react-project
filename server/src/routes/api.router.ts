import { Router } from 'express';

import { authRouter } from './auth.router';
import { userRouter } from './user.router';
import { postRouter } from './post.router';
import { commentRouter } from './comment.router';

const router = Router();

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/posts', postRouter);
router.use('/comments', commentRouter);

// @ts-ignore
router.use('*', (err, req, res, next) => {
    res.status(err.code || 500).json({ message: err.message });
});

export const apiRouter = router;
