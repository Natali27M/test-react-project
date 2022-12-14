import { IPost } from './post.interface';
import { IComment } from './comment.interface';

export interface IUser {
    id: number;
    name: string;
    surname: string;
    email: string;
    password: string;
    createdAt: string;
    deletedAt?: string;
    products?: IPost[];
    comments?: IComment[];
}
