import { Link, useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { getUserData } from "../../services/auth/getDataUser";
import MainLayout from '../../layouts/main';
import CatalogProfile from "../../components/Catalog/CatalogProfile";

export default function Profile() {
   const navigate = useNavigate();
   const token = localStorage.getItem('accessToken');
   const userData = getUserData(token);
   const status = userData.role;
   localStorage.setItem('userData', userData);
   console.log(userData);

   if (!token) {
      setTimeout(() => {
         alert('Вы не можете зайти у вас нету аккаунта')
      }, 50);
      return navigate('/');
   }

   return (
      <MainLayout main='flex mt-10 mb-8' body="bg-orange-50">
         <CatalogProfile />
         <main className="p-6 flex flex-grow flex-col">
            <article className="mb-10 border-2 border-gray-500 rounded-lg p-6 flex justify-between items-center w-full">
               <div className="flex items-center w-full">
                  <div className="w-20 h-20 bg-slate-400 rounded-xl"></div>
                  <span className="font-600 text-xl text-gray-600 ml-6">{userData.name}</span>
               </div>
               {/* Edit */}
               <button className="border-orange-500 border-2 rounded-md hover:bg-orange-300 transition duration-300 py-2 px-8 font-600 text-gray-700 text-xl">Изменить</button>
            </article>

            <article className="mb-10 border-2 border-gray-500 rounded-lg p-6">
               <div className="flex justify-between items-center w-full mb-4">
                  <h2 className="font-bold text-2xl text-slate-700 mb-4"> Личная информация</h2>
                  <button className="border-orange-500 border-2 rounded-md hover:bg-orange-300 transition duration-300 py-2 px-8 font-600 text-gray-700 text-xl">Редактировать</button>
               </div>

               <table className="table-auto border-collapse mb-6">
                  <tbody>
                     <tr>
                        <td className="px-4 py-2 font-medium">Дата реестрации:</td>
                        <td className="px-4 py-2 font-bold text-gray-700"> - Не указано</td>
                     </tr>
                     <tr>
                        <td className="px-4 py-2 font-medium">Страна, город:</td>
                        <td className="px-4 py-2 font-bold text-gray-700"> - Не указано</td>
                     </tr>
                     <tr>
                        <td className="px-4 py-2 font-medium">Дата рождения:</td>
                        <td className="px-4 py-2 font-bold text-gray-700"> - Не указано</td>
                     </tr>

                     <tr>
                        <td className="px-4 py-2 font-medium">Email:</td>
                        <td className="px-4 py-2 font-bold text-gray-700">{userData.email}</td>
                     </tr>
                     <tr>
                        <td className="px-4 py-2 font-medium">Телефон:</td>
                        <td className="px-4 py-2 font-bold text-gray-700"> - Не указано</td>
                     </tr>
                  </tbody>
               </table>

               {/* Проверяем, что данные пользователя загружены */}
               {/* {userData ? ( */}
               {/* <ul> */}
               {/* <li><strong>Почта: {userData.email || 'Нет данных'}</strong></li> */}
               {/* <li><strong>Ф.И.О:  {userData.name || 'Нет данных'}</strong></li> */}
               {/* <li><strong>Роль:  {userData.role || 'Нет данных'}</strong></li> */}
               {/* </ul> */}
               {/* ) : ( */}
               {/* <div className="flex justify-center items-center h-full"> */}
               {/* <ClipLoader color="#FFA500" size={100} /> */}
               {/* </div> */}
               {/* )}  */}
            </article>

            <article className="mb-10 border-2 border-gray-500 rounded-lg p-6 h-[60vh]">
               <h2 className="text-2xl text-gray-800">Платежная информация</h2>
            </article>
         </main>
      </MainLayout>
   );
}
