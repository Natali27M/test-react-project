import {IPost} from "./post.interface";

export interface IStatePost {
    posts: IPost[];
    status: string | null;
    error: string | null;
}
