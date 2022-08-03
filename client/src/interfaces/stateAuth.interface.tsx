import { IUser } from './user.interface';

export interface IStateAuth {
    user: IUser | null;
    status: string | null;
    error: string | null;
}
