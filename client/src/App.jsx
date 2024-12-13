import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

/* Pages */
import Home from './Pages/Home';
import Product from './Pages/Product';
import NotFound from './Pages/NotFound';
import Basket from './Pages/Basket';
import Catalog from './Pages/Catalog';
import OrderCompleted from './Pages/Order/Order';

/*Style */
import './style/App.css';
import './style/banner.css';
import './style/adaptive/pages/home.css';

function App() {
   return (
      <Routes>
         <Route path="/" element={<Navigate to="api/product" />} /> {/* Перенаправление на /home */}
         <Route path="api/product" element={<Home />} /> {/* Главная страница */}
         <Route path="api/product/:id" element={<Product />} /> {/* Страница продукта */}
         <Route path="api/basket/checkout" element={<OrderCompleted />} /> {/* Просмотр своих заказ + Вход/регистрация */}
         <Route path="api/basket" element={<Basket />} /> {/* Страница Карзины */}
         
         {/* Категории  */}
         <Route path="api/product/category" element={<Catalog />} />
         <Route path="api/product/productByCategory/:category" element={<Catalog />} />

         {/* Аккаунт человека */}
         <Route path="/auth" element={<Catalog />} />
         

         <Route path="*" element={<NotFound />} /> {/* Обработка неизвестных маршрутов */}
      </Routes>
   );
}

export default App;