import {axiosService} from "./axios.service";
import {urls} from "../configs";

export const postService={
    getAll: () => axiosService.get<any>(urls.post)
}
