import { IComment } from './comment.interface';

export interface IStateComment {
    comments: IComment[];
    status: string | null;
    error: string | null;
}
