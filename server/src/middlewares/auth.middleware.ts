import { Response, Request, NextFunction } from 'express';
import { getManager } from 'typeorm';

import { User } from '../entity';
import { ErrorHandler } from '../error/errorHandler';

class AuthMiddleware {
    async checkIsUserExists(req:Request, res:Response, next:NextFunction) {
        try {
            const { email } = req.body;

            const checkEmail = await getManager().getRepository(User).findOne({ email });

            if (checkEmail) {
                next(new ErrorHandler(`User with this email ${email} has exist`, 400));
                return;
            }

            next();
        } catch (e) {
            next(e);
        }
    }

    async checkIsUserAuth(req: Request, res: Response, next: NextFunction) {
        try {
            const { email } = req.params;

            const checkEmail = await getManager()
                .getRepository(User)
                .findOne({ email });
            if (!checkEmail) {
                next(new ErrorHandler(`User with this email ${email} doesn't exist`, 404));
                return;
            }

            next();
        } catch (e) {
            next(e);
        }
    }
}

export const authMiddleware = new AuthMiddleware();
