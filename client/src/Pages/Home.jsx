import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Catalog from '../components/Catalog/Catalog';
import Banner from '../components/Banner/Banner';
import ViewProduct from '../components/goods/ViewProduct';

/* Подключение модальных окон страниц */
import RegistrationModal from '../components/Modal/RegistrationModal';
import Login from '../components/Modal/Login';

import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
   //Получаем API
   const [products, setProducts] = useState([]);
   const [error, setError] = useState(null);
   const navigate = useNavigate(); //Для обработки ошибок
   useEffect(() => {
      const fetchProducts = async () => {
         try {
            const response = await axios.get('https://www.apishka.somee.com/api/product?_order=asc&_start=0&_end=4', {
               params: {
                  _order: 'asc',
                  _start: 0,
                  _end: 100
               },
               headers: {
                  'accept': '*/*'
               }
            });
            setProducts(response.data); //Тут передаём данные на setProduct
         } catch (err) {
            setError(err.message);
         }
      };
      fetchProducts();
   }, []);


   //Модальные окна
   const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
   const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

   const closeLoginModal = () => setIsLoginModalOpen(false);
   const closeRegisterModal = () => setIsRegisterModalOpen(false);

   useEffect(() => {
      const loginValue = localStorage.getItem('login');
      const registerValue = localStorage.getItem('register');

      if (loginValue) {
         setIsLoginModalOpen(true);
      } else if (registerValue) {
         setIsRegisterModalOpen(true);
      }
   }, []);

   return (
      <>
         <Header />
         <main className="grid grid-cols-3 gap-3 mt-10 mb-8">
            <Catalog />
            <div className="col-span-2">
               <Banner />
               {/* Телефоны */}
               <ViewProduct products={products} text={"Телефоны"} link={'/phone'} buttonRight={'160px'} />
               {/* Сетевые адаптеры */}
               <ViewProduct products={products} text={"комплекты"} link={'/complects'} buttonRight={'160px'} />
               {/* Ноутбуки */}
               <ViewProduct products={products} text={"Ноутбуки"} link={'/laptop'} buttonRight={'140px'} />
               {/* Клавиатуры и мыши */}
               <ViewProduct products={products} text={"Клавиатуры"} link={'/mouse'} buttonRight={'180px'} />
            </div>
         </main>
         <Footer />
      </>
   );
}
