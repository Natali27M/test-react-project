export interface IComment {
    id: number;
    userId: number | undefined;
    postId: number;
    description: string;
}
