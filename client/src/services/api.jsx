import axios from 'axios';

// Функция для проверки авторизации
export const checkAuth = async () => {
   await axios.get('https://www.apishka.somee.com/api/auth/refresh');
};

// Функция для входа
export const login = async (email, password) => {
   await axios.post('https://www.apishka.somee.com/api/auth/singIn', { email, password });
};

// Функция для регистрации
export const register = async (email, password) => {
   await axios.post('https://www.apishka.somee.com/api/auth/reg', { email, password });
};
