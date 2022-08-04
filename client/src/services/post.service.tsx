import { axiosService } from './axios.service';
import { urls } from '../configs';

export const postService={
    getAll: (page:number) => axiosService.get<any>(urls.post,{ params:{ page } })
}
