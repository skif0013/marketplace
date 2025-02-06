/* Компоненты */
import getRoutes from './routes/routes';
import { useEffect } from 'react';
import { getUserData } from "./services/auth/getDataUser";

/*Style */
import './style/App.css';
import './style/banner.css';
import './style/adaptive/pages/adaptive.css';

function App() {
   // localStorage.setItem('accessToken', '');
   // localStorage.setItem('refreshToken', '');
   const accessToken = localStorage.getItem('accessToken');
   const refreshToken = localStorage.getItem('refreshToken')

   console.log('accessToken: ',accessToken);
   console.log('refreshToken: ',refreshToken);
   function isTokenExpired(token) {
      if (!token) return null;
      const getExp = getUserData(token);
      const isExpired = getExp.exp * 1000 < Date.now(); // Проверяем срок действия токена
      return isExpired;
   }

   async function refreshTokenIfNeeded() {
      if (!refreshToken || !accessToken) return console.log('Токенов нет');


      if (isTokenExpired(accessToken) && isTokenExpired(refreshToken)) {
         console.log('Время обновления токена');
         try {
            const response = await axios.get('https://marketplace-800v.onrender.com/api/auth/refresh', {
               headers: {
                  'Accept': 'application/json',
                  'Authorization': `Bearer ${refreshToken}`,
               }
            });

            console.log('Новый токен получен:', response.data);
            localStorage.setItem('accessToken', response.data.accessToken);
         } catch (error) {
            console.error('Ошибка при обновлении токена:', error.response?.data || error.message);
            if (error.response?.status === 401) {
               console.log('Токен недействителен. Выход из системы...');
               localStorage.setItem('accessToken', '');
               localStorage.setItem('refreshToken', '');
            }
         }
      } else {
         console.log('Токен истёк');
      }
   }

   // Запускаем проверку токена каждые 5 минут (300000 мс)
   setInterval(refreshTokenIfNeeded, 300000);

   return getRoutes()
}

export default App;  