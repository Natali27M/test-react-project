import { IComment } from './comment.interface';

export interface IPost {
    id: number;
    userId: number;
    title: string;
    description: string;
    comments?: IComment[];
}
