import { getManager } from 'typeorm';
import bcrypt from 'bcrypt';

import { ITokendata, IUser } from '../interfaces';
import { User } from '../entity';
import { tokenService } from './token.service';
import { ErrorHandler } from '../error/errorHandler';

class AuthService {
    async registration(user:IUser):Promise<ITokendata> {
        const { email, password } = user;

        const hashPassword = await bcrypt.hash(password, 5);
        const userHashed = { ...user, password: hashPassword };

        const newUser = await getManager().getRepository(User).save(userHashed);

        const tokens = tokenService.generateToken({ email, userId: newUser.id });
        await tokenService.saveToken(newUser.id, tokens.accessToken, tokens.refreshToken);

        return {
            ...tokens,
            ...newUser,
        };
    }

    async login(email:string, password:string):Promise<ITokendata> {
        const user = await getManager().getRepository(User).findOne({ email });

        if (!user) {
            throw new ErrorHandler(`User with this ${email} doesn't exist`, 400);
        }

        const isPasswordEqual = await bcrypt.compare(password, user.password);

        if (!isPasswordEqual) {
            throw new ErrorHandler('Password or email is wrong');
        }

        const tokens = tokenService.generateToken({ email, userId: user.id });
        await tokenService.saveToken(user.id, tokens.accessToken, tokens.refreshToken);

        return {
            ...tokens,
            ...user,
        };
    }

    async logout(refreshToken:string) {
        return tokenService.removeToken(refreshToken);
    }
}

export const authService = new AuthService();
