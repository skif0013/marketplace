import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

/* Pages */
import Home from '../../Pages/Home';
import Product from '../../Pages/Product';
import NotFound from '../../Pages/NotFound';
import Basket from '../../Pages/Basket';
import Catalog from '../../Pages/Catalog/Catalog';
import ProductByCategory from '../../Pages/Catalog/ProductByCategory';
import OrderCompleted from '../../Pages/Order/Order';
import Profile from '../../Pages/Profile/Profile';

/* Components */
import ProtectedRoute from './ProtectedRoute';

const getRoutes = () => (
   <Routes>
      {/* Redirect */}
      <Route path="/" element={<Navigate to="/api/product" />} />

      {/* Основное */}
      <Route path="api/product" element={<Home />} /> {/* Home page */}
      <Route path="api/product/:id" element={<Product />} /> {/* Product page */}
      <Route path="api/basket/checkout" element={<OrderCompleted />} /> {/* Order Completed */}
      <Route path="api/basket" element={<Basket />} /> {/* Basket page */}

      {/* Категории */}
      <Route path="api/product/category" element={<Catalog />} />
      <Route path="api/product/productByCategory/:category" element={<ProductByCategory />} />

      {/* Для пользователей */}
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      
      {/* Все ошибки */}
      <Route path="*" element={<NotFound />} />
   </Routes>
);

export default getRoutes;