import { getManager } from 'typeorm';

import { Post } from '../entity';
import { IPaginationResponse, IPost } from '../interfaces';

class PostService {
    public async createPost(post: IPost): Promise<IPost> {
        return getManager().getRepository(Post).save(post);
    }

    public async getPosts(): Promise<IPost[]> {
        return getManager().getRepository(Post).find();
    }

    public async getPostPagination(
        limit: number,
        page: number = 1,
        searchObject: Partial<IPost> = {},
    )
        :Promise<IPaginationResponse<IPost>> {
        const skip = limit * (page - 1);

        const [posts, itemCount] = await getManager().getRepository(Post)
            .findAndCount({ where: searchObject, skip, take: limit });

        return {
            page,
            perPage: limit,
            itemCount,
            data: posts,
        };
    }
}

export const postService = new PostService();
