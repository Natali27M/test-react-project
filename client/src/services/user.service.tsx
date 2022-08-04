import { axiosService } from './axios.service';
import { urls } from '../configs';

export const userService={
    getAll: () => axiosService.get<any>(urls.user)
}
