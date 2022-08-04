import { NextFunction, Request, Response } from 'express';

import { userService } from '../services';
import { IUser } from '../interfaces';

class UserController {
    public async createUser(req: Request, res: Response): Promise<Response<IUser>> {
        const createdUser = await userService.createUser(req.body);
        return res.json(createdUser);
    }

    public async getUserByEmail(req: Request, res: Response, next: NextFunction):
        Promise<Response<IUser> | undefined> {
        try {
            const { email } = req.params;
            const user = await userService.getUserByEmail(email);
            return res.json(user);
        } catch (e) {
            next(e);
        }
    }

    public async getUsers(req: Request, res: Response): Promise<Response<IUser[]>> {
        const allUsers = await userService.getUsers();
        return res.json(allUsers);
    }
}

export const userController = new UserController();
