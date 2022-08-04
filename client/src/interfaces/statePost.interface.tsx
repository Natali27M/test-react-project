import { IPost } from './post.interface';
import { IData } from './data.interface';

export interface IStatePost {
    posts: IPost[];
    data: IData;
    status: string | null;
    error: string | null;
}
