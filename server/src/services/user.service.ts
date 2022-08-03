import { getManager } from 'typeorm';
import bcrypt from 'bcrypt';

import { User } from '../entity';
import { IUser } from '../interfaces';
import { config } from '../configs';

class UserService {
    public async createUser(user: IUser): Promise<IUser> {
        const { password } = user;

        const hashedPassword = await UserService._hashPassword(password);
        const dataToSave = { ...user, password: hashedPassword };

        return getManager().getRepository(User).save(dataToSave);
    }

    private static async _hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, Number(config.USER_SALT_ROUNDS));
    }

    public async getUsers(): Promise<IUser[]> {
        return getManager().getRepository(User).find();
    }

    // public async getUserById(id:number):Promise<IUser | undefined> {
    //     return getManager()
    //         .getRepository(User)
    //         .createQueryBuilder('user')
    //         .where('user.id = :id', { id })
    //         .andWhere('user.deletedAt IS NULL')
    //         .getOne();
    // }

    public async getUserByEmail(email: string): Promise<IUser | undefined> {
        return getManager()
            .getRepository(User)
            .createQueryBuilder('user')
            .where('user.email = :email', { email })
            .andWhere('user.deletedAt IS NULL')
            .getOne();
    }
}

export const userService = new UserService();
