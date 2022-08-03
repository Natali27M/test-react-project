import { getManager } from 'typeorm';

import { Post } from '../entity';
import { IPost } from '../interfaces';

class PostService {
    public async createPost(post: IPost): Promise<IPost> {
        return getManager().getRepository(Post).save(post);
    }

    public async getPosts(): Promise<IPost[]> {
        return getManager().getRepository(Post).find();
    }
}

export const postService = new PostService();
