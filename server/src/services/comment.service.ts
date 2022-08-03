import { getManager } from 'typeorm';

import { Comment } from '../entity';
import { IComment } from '../interfaces';

class CommentService {
    public async createComment(comment: IComment): Promise<IComment> {
        return getManager().getRepository(Comment).save(comment);
    }

    public async getComments(): Promise<IComment[]> {
        return getManager().getRepository(Comment).find();
    }
}

export const commentService = new CommentService();
