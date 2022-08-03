import { Request, Response } from 'express';
import { IPost } from '../interfaces';
import { postService } from '../services';

class PostController {
    public async createPost(req: Request, res: Response): Promise<Response<IPost>> {
        const createdPost = await postService.createPost(req.body);
        return res.json(createdPost);
    }

    public async getPosts(req: Request, res: Response): Promise<Response<IPost[]>> {
        const allPosts = await postService.getPosts();
        return res.json(allPosts);
    }
}

export const postController = new PostController();
