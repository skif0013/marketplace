import { Link, useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { getUserData } from "../../services/auth/getDataUser";
import { setAccessToken } from "../../services/authUpdate";


export default function Profile() {
   const navigate = useNavigate();
   const token = localStorage.getItem('accessToken');
   const userData = getUserData(token);
   localStorage.setItem('userData', userData); 

   if (!token) {
      setTimeout(() => {
         alert('Вы не можете зайти у вас нету аккаунта')
      }, 50);
      return navigate('/');
   }

   //Обновление токена
   setAccessToken(token, userData.exp);

   return (
      <>
         <Link to={'/'} className="text-red-500 font-bold text-xl m-10 hover:border-bottom">Назад</Link>
         <br /><br />
         <h1 className="font-bold text-4xl">Профиль клиента</h1>
         <br /><br />
         <h1 className="font-bold text-4xl">Данные из access-Tokena</h1>
         <br />
         {/* Проверяем, что данные пользователя загружены */}
         {userData ? (
            <ul>
               <li><strong>Почта: {userData.email || 'Нет данных'}</strong></li>
               <li><strong>Ф.И.О:  {userData.name || 'Нет данных'}</strong></li>
               <li><strong>Роль:  {userData.role || 'Нет данных'}</strong></li>
            </ul>
         ) : (
            <div className="flex justify-center items-center h-full">
               <ClipLoader color="#FFA500" size={100} />
            </div>
         )}
      </>
   );
}
