import { IPost } from './post.interface';
import { IData } from './data.interface';

export interface IActionFulledPosts {
    posts: IPost[];
    data: IData;
}
