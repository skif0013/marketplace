export const getUserData = (token) => {
   const base64Url = token.split('.')[1];
   // Декодируем payload из base64 в строку
   const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Преобразуем в формат base64
   const decodedPayload = JSON.parse(atob(base64)); // Декодируем из base64 и парсим JSON
   // Извлекаем необходимые данные из декодированного payload
   const userData = {
      email: decodedPayload.Email,
      name: decodedPayload.Name,
      exp: decodedPayload.exp,
      iss: decodedPayload.iss,
      role: decodedPayload.role,
   };
   return userData;
}
