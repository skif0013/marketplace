// src/services/api.js
import axios from 'axios';

const api = axios.create({
   baseURL: 'https://marketplace-800v.onrender.com/api',
   headers: {
      'Content-Type': 'application/json',
   },
});

// Функция для обновления токена
const refreshToken = async () => {
   const refreshToken = localStorage.getItem('refreshToken');
   try {
      const response = await axios.post('/auth/refresh', { refreshToken });
      const { accessToken, refreshToken: newRefreshToken } = response.data;

      // Сохраняем новые токены в localStorage
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', newRefreshToken);

      return accessToken;  // Возвращаем новый accessToken
   } catch (error) {
      console.error('Ошибка обновления токена', error);
      // Можно очистить localStorage или направить пользователя на страницу входа
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      return null;
   }
};

// Перехватчик для обработки ошибок с токеном
api.interceptors.response.use(
   (response) => response,  // Возвращаем ответ, если все ок
   async (error) => {
      const originalRequest = error.config;
      // Проверяем, если ошибка аутентификации (например, 401)
      if (error.response.status === 401 && !originalRequest._retry) {
         originalRequest._retry = true;

         const newAccessToken = await refreshToken();

         if (newAccessToken) {
            // Устанавливаем новый токен в заголовки и повторно выполняем запрос
            originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
            return axios(originalRequest);
         }
      }
      return Promise.reject(error);
   }
);

export default api;
