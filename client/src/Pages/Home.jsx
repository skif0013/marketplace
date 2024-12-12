import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Catalog from '../components/Catalog/Catalog';
import Title from '../components/Title';
import Product from '../components/goods/Product';
import Banner from '../components/Banner/Banner';

import React, { useEffect, useState } from 'react';
import axios from 'axios';


export default function Home() {
   const [products, setProducts] = useState([]);
   const [error, setError] = useState(null);

   useEffect(() => {
      const fetchProducts = async () => {
         try {
            const response = await axios.get('https://www.apishka.somee.com/api/product', {
               params: {
                  _order: 'asc',
                  _start: 0,
                  _end: 100
               },
               headers: {
                  'accept': '*/*'
               }
            });

            setProducts(response.data);

         } catch (err) {
            setError(err.message);
         }
      };

      fetchProducts();
   }, []);

   // Обработка ошибок
   if (error) {
      return <div>Error: {error}</div>;
   }
   //Выдать первые 4 товара
   const firstFourGoods = products.slice(0, 4);
   
   return (
      <>
         <Header />
         <main className="grid grid-cols-3 gap-3 mt-10 mb-8">
            <Catalog />
            <div className="col-span-2">
               <Banner />
               {/* Iphone */}
               <Title text="Iphone" link={''} buttonRight='100px' target='_blank' />
               <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 mb-12" style={{ overflow: 'hidden' }}>
                  {firstFourGoods.map((product) => {
                     return (
                        <Product
                           key={product.id}
                           id={product.id}
                           pictureUrl={product.pictureUrl}
                           price={product.price}
                           title={product.title.ru}
                        />
                     );
                  })}
               </section>


               {/* Iphone */}
               <Title text="Iphone" link={''} buttonRight='100px' target='_blank' />
               <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 mb-12" style={{ overflow: 'hidden' }}>
                  {firstFourGoods.map((product) => {
                     return (
                        <Product
                           key={product.id}
                           id={product.id}
                           pictureUrl={product.pictureUrl}
                           price={product.price}
                           title={product.title.ru}
                        />
                     );
                  })}
               </section>

               {/* Laptop */}
               <Title text="Ноутбуки" link={''} buttonRight='140px' target='_blank' />
               <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 mb-12" style={{ overflow: 'hidden' }}>
                  {firstFourGoods.map((product) => {
                     return (
                        <Product
                           key={product.id}
                           id={product.id}
                           pictureUrl={product.pictureUrl}
                           price={product.price}
                           title={product.title.ru}
                        />
                     );
                  })}
               </section>

               {/* Наушники */}
               <Title text="Наушники" link={''} buttonRight='150px' target='_blank' />
               <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 mb-12" style={{ overflow: 'hidden' }}>
                  {firstFourGoods.map((product) => {
                     return (
                        <Product
                           key={product.id}
                           id={product.id}
                           pictureUrl={product.pictureUrl}
                           price={product.price}
                           title={product.title.ru}
                        />
                     );
                  })}
               </section>
            </div>
         </main>
         <Footer />
      </>
   );
}
