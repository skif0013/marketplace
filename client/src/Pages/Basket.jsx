import MainLayout from "../layouts/main";
import { BasketEmpty, BasketMain } from '../components/Basket/Basket.jsx';
import React, { useState } from "react";

export default function Basket() {
   const [basket, setBasket] = useState([
      { id: "3490387208", title: "Iphone rx 3500", price: 10000, quantity: 20, categories: "Телефоны и аксессуары" },
      { id: "3208490832084908", title: "Клавиатура на мембране", price: 39398, quantity: 4, categories: "Клавиатуры и Мыши" },
      { id: "34985439580", title: "Наушники Sony air Bach", price: 560390, quantity: 7, categories: "Наушники и Аксессуары" },
      { id: "12348239432", title: "Адаптер", price: 308419, quantity: 9, categories: "Сетевое оборудование" },
      { id: "09868902635", title: "Видео карта RX-3080 it", price: 178456, quantity: 6, categories: "Комплектующие" },
   ]);
   //ЧТото
   //ыжыжыж

   // Синхронізувати зміни у кошику
   const handleRemoveItem = (id) => {
      setBasket(basket.filter((item) => item.id !== id));
   };

   const handleUpdateQuantity = (id, amount) => {
      setBasket(
         basket.map((item) =>
            item.id === id ? { ...item, quantity: Math.max(item.quantity + amount, 1) } : item
         )
      );
   };

   return (
      <MainLayout body={`flex flex-col min-h-screen ${basket.length === 0 ? "bg-orange-100" : ""}`} main="flex-grow mb-52 mt-20">
            {basket.length === 0 ? (
               <BasketEmpty />
            ) : (
               <BasketMain
                  basket={basket}
                  onRemove={handleRemoveItem}
                  onUpdateQuantity={handleUpdateQuantity}
               />
            )}
      </MainLayout>
   );
}