import { IComment } from './comment.interface';

export interface IPost {
    id: number;
    userId: number;
    title: string;
    description: string;
    createdAt: string;
    deletedAt?: string;
    comments?: IComment[];
}
