import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';


import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Catalog from '../components/Catalog/Catalog';
import Banner from '../components/Banner/Banner';
import ViewProduct from '../components/goods/ViewProduct';

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


   return (
      <>
         <Header />
         <main className="grid grid-cols-3 gap-3 mt-10 mb-8">
            <Catalog />
            <div className="col-span-2">
               <Banner />
               {/* Телефоны */}
               <ViewProduct products={products} title={"Телефоны"} link={'/phone'} buttonRight={'160px'} />
               {/* Сетевые адаптеры */}
               <ViewProduct products={products} title={"комплекты"} link={'/complects'} buttonRight={'160px'} />
               {/* Ноутбуки */}
               <ViewProduct products={products} title={"Ноутбуки"} link={'/laptop'} buttonRight={'140px'} />
               {/* Клавиатуры и мыши */}
               <ViewProduct products={products} title={"Клавиатуры"} link={'/mouse'} buttonRight={'180px'} />
            </div>
         </main>
         <Footer />
      </>
   );
}
