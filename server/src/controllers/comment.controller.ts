import { Request, Response } from 'express';
import { IComment } from '../interfaces';
import { commentService } from '../services';

class CommentController {
    public async createComment(req: Request, res: Response): Promise<Response<IComment>> {
        const createdComment = await commentService.createComment(req.body);
        return res.json(createdComment);
    }

    public async getComments(req: Request, res: Response): Promise<Response<IComment[]>> {
        const allComments = await commentService.getComments();
        return res.json(allComments);
    }
}

export const commentController = new CommentController();
