const baseURL = 'http://localhost:5200';

export const urls = {
    post: '/posts',
    user: '/users',
    comment: '/comments',
    auth: {
        signUp: '/auth/registration',
        login: '/auth/login',
        refresh: '/auth/refresh',
    },
};

export default baseURL;
