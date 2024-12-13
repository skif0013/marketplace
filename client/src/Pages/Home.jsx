import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Catalog from '../components/Catalog/Catalog';
import Title from '../components/Title';
import Product from '../components/goods/Product';
import Banner from '../components/Banner/Banner';

import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ClipLoader from "react-spinners/ClipLoader";


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
            console.log(response.data);
            setProducts(response.data); //Тут передаём данные на setProduct
         } catch (err) {
            setError(err.message);
            console.error('Запрос НЕ  принят, и НЕ одобрен');
            // navigate('/notfound');
         }
      };
      fetchProducts();
   }, []);

   //Добавление товаров
   //рандомные товары
   const getRandomProducts = (products, count) => {
      const shuffled = [...products].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
   };
   function ViewProduct({ text, link, buttonRight }) {
      const randomFourGoods = products ? getRandomProducts(products, 4) : [];
      return (
         <>
            <Title text={text} link={link} buttonRight={buttonRight} target='_blank' />
            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 mb-12" style={{ overflow: 'hidden' }}>
               {products && products.length > 0 ? (
                  randomFourGoods.map((product) => (
                     <Product
                        key={product.id}
                        id={product.id}
                        pictureUrl={product.pictureUrl}
                        price={product.price}
                        title={product.title.ru}
                     />
                  ))
               ) : (
                  <div className="flex justify-center items-center">
                     <ClipLoader color="#FFA500" size={60} />{/* Загрузка */}
                  </div>
               )}
            </section>
         </>
      );
   }


   return (
      <>
         <Header />
         <main className="grid grid-cols-3 gap-3 mt-10 mb-8">
            <Catalog />
            <div className="col-span-2">
               <Banner />
               {/* Телефоны */}
               <ViewProduct text={"Телефоны"} link={'/phone'} buttonRight={'160px'} />
               {/* Сетевые адаптеры */}
               <ViewProduct text={"комплекты"} link={'/complects'} buttonRight={'160px'} />
               {/* Ноутбуки */}
               <ViewProduct text={"Ноутбуки"} link={'/laptop'} buttonRight={'140px'} />
               {/* Клавиатуры и мыши */}
               <ViewProduct text={"Клавиатуры"} link={'/mouse'} buttonRight={'180px'} />
            </div>
         </main>
         <Footer />
      </>
   );
}
