import { Router } from 'express';
import { postController } from '../controllers';

const router = Router();

router.post('/', postController.createPost);
router.get('/', postController.getPostPagination);

export const postRouter = router;
