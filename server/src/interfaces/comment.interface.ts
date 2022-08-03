export interface IComment {
    id: number;
    userId: number;
    postId: number;
    description: string;
    createdAt: string;
    deletedAt?: string;
}
