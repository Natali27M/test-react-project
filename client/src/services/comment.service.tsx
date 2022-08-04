import { axiosService } from './axios.service';

import { urls } from '../configs';
import { IComment } from '../interfaces';

export const commentService = {
    getAll: () => axiosService.get<IComment[]>(urls.comment),
    create: (myComment: any) => axiosService
        .post(urls.comment, myComment)
        .then((value) => value.data),
};
