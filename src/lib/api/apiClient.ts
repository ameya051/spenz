import axios from 'axios';
import { refreshTokens } from './auth';

export const apiClient = axios.create({
    baseURL: '/api',
    withCredentials: true
});

apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            const refreshed = await refreshTokens();
            if (refreshed) {
                return apiClient(originalRequest);
            }
            localStorage.removeItem('refreshToken');
            const currURL = window.location.href;
            if (currURL.includes('dashboard')) window.location.href = '/login';

        }
        return Promise.reject(error);
    }
);
