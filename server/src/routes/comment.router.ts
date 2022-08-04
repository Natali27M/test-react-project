import { Router } from 'express';

import { commentController } from '../controllers';

const router = Router();

router.post('/', commentController.createComment);
router.get('/', commentController.getComments);

export const commentRouter = router;
