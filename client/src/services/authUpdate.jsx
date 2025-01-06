import { useNavigate } from "react-router-dom";

let tokenExpirationTimeout;

export function setAccessToken(accessToken, expiresInSeconds) {
   localStorage.setItem('accessToken', accessToken);

   // Сохраняем время истечения токена
   const expirationTime = Date.now() + expiresInSeconds * 1000;
   localStorage.setItem('tokenExpirationTime', expirationTime);

   // Настроить таймер
   if (tokenExpirationTimeout) clearTimeout(tokenExpirationTimeout);
   tokenExpirationTimeout = setTimeout(async () => {
      await refreshToken();
   }, (expiresInSeconds - 10) * 1000);
}

async function refreshToken() {
   const navigate = useNavigate();
   const refreshToken = localStorage.getItem('refreshToken');
   if (!refreshToken) {
      localStorage.setItem('accessToken', '');
      navigate('/');
      setTimeout(() => {
         alert('Войдите в аккаунт')
      }, 2000);
   }

   if (!refreshToken) {
      console.error('No refresh token available');
      return null;
   }
   try {
      const response = await fetch('https://marketplace-800v.onrender.com/api/product', {
         method: 'GET',
         headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${refreshToken}`
         }
      });
      localStorage.setItem('accessToken', response.data);
   } catch (error) {
      console.error('Error refreshing token:', error);
   }
}

// При загрузке страницы проверяем, нужно ли обновить токен
export function checkTokenExpiration() {
   const expirationTime = localStorage.getItem('tokenExpirationTime');
   if (!expirationTime) return;

   const timeLeft = expirationTime - Date.now();
   if (timeLeft > 0) {
      // Таймер все еще не истек, запускаем таймер обновления
      tokenExpirationTimeout = setTimeout(async () => {
         await refreshToken();
      }, timeLeft - 10000); // Обновляем за 10 секунд до истечения
   } else {
      // Токен уже истек, пробуем обновить
      refreshToken();
      console.log('Токен обновлён');
   }
}

// Вызываем при загрузке страницы
checkTokenExpiration();