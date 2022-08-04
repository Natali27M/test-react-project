import { NextFunction, Request, Response } from 'express';

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

    public async getPostPagination(req: Request, res: Response, next: NextFunction) {
        try {
            const { page = 25, perPage = 5, ...other } = req.query;

            const postPagination = await postService.getPostPagination(
                Number(perPage),
                Number(page),
                other,
            );

            res.json(postPagination);
        } catch (e) {
            next(e);
        }
    }
}

export const postController = new PostController();
