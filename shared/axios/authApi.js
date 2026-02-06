import axiosClient from './axiosClient';

const login = async (email, password) => {
    const response = await axiosClient.post('/auth/login', { email, password });
    return response.data;
};

const refresh = async (refreshToken) => {
    const response = await axiosClient.post('/auth/refresh', {
        refresh_token: refreshToken,
    });
    return response.data;
};

const getMe = async () => {
    const response = await axiosClient.get('/auth/me');
    return response.data;
};

const authApi = {
    login,
    refresh,
    getMe,
};

export default authApi;
