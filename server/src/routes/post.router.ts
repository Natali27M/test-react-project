import { Router } from 'express';
import { postController } from '../controllers';

const router = Router();

router.post('/', postController.createPost);
router.get('/', postController.getPosts);

export const postRouter = router;
