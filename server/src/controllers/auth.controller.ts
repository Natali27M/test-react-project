import { NextFunction, Request, Response } from 'express';

import { authService } from '../services';

class AuthController {
    public async registration(req: Request, res: Response, next:NextFunction) {
        try {
            const newUser = await authService.registration(req.body);

            res.cookie('refreshToken', newUser.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });
            return res.json(newUser);
        } catch (e) {
            next(e);
        }
    }

    public async login(req: Request, res: Response, next:NextFunction) {
        try {
            const { email, password } = req.body;

            const userFromDB = await authService.login(email, password);

            res.cookie('refreshToken', userFromDB.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });
            return res.json(userFromDB);
        } catch (e) {
            next(e);
        }
    }
}

export const authController = new AuthController();
