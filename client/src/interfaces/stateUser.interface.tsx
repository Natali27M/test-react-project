import {IUser} from "./user.interface";

export interface IStateUser {
    users: IUser[];
    status: string | null;
    error: string | null;
}
