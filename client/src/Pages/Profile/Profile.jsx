import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";


export default function Profile() {
   const navigate = useNavigate();
   const token = localStorage.getItem('accessToken');
   const [userData, setUserData] = useState(null);

   // Если токен отсутствует, перенаправляем на главную страницу
   useEffect(() => {
      if (!token) {
         navigate('/');
         setTimeout(() => {
            alert("Вы не зарегистрированы, вы не можете войти в кабинет");
         }, 1500);
      } else {
         checkToken(); // Вызываем checkToken, если токен существует
      }
   }, [token, navigate]); // useEffect будет срабатывать при изменении token или navigate

   const checkToken = () => {
      if (token) {
         // Разделяем токен на части
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
         setUserData(userData);
      } else {
         console.log('Token not found');
      }
   };

   return (
      <>
         <Link to={'/'} className="text-red-500 font-bold text-xl">Назад</Link>
         <br />
         <h1 className="font-bold text-4xl">Профиль клиента</h1>

         {/* Выводим токен */}
         <div>
            <div className="font-bold text-2xl">Access Token: <p>{token}</p></div>
         </div>
         <br />

         <h1 className="font-bold text-4xl">Данные из access-Tokena</h1>

         {/* Проверяем, что данные пользователя загружены */}
         {userData ? (
            <ul>
               <li><strong>{userData.email || 'Нет данных'}</strong></li>
               <li><strong>{userData.name || 'Нет данных'}</strong></li>
               <li><strong>{userData.exp || 'Нет данных'}</strong></li>
               <li><strong>{userData.iss || 'Нет данных'}</strong></li>
               <li><strong>{userData.role || 'Нет данных'}</strong></li>
            </ul>
         ) : (
            <div className="flex justify-center items-center h-full">
               <ClipLoader color="#FFA500" size={100} />
            </div>
         )}
      </>
   );
}
