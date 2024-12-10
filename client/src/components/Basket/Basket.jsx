import { Link } from 'react-router-dom'
import './basket.css';
import CartItem from '../goods/CartItem/CartItem';
import { ButtonMain, ButtonL } from '../buttons/button';
import WhiteButton from '../buttons/WhiteButton/WhiteButton';
import React from 'react';

export function BasketEmpty() {
   return (
      <div className="basket">
         <h1 className="text-4xl">Корзина пуста</h1>
         <img src="/images/main/variable/basket/bigBasket.svg" alt="Big basket" />
         <h1>К сожалению, у вас нету товара</h1>
         <div className="flex flex-col items-center justify-center gap-2">
            <p>Вы можете нажать на кнопку “Продолжить покупки”, либо вы можете нажать</p>
            <p>на логотип, и вас переведет на главную страницу сайта</p>
         </div>
         <Link to='/'>
            <ButtonMain name={'Продолжить покупки'} />
         </Link>
      </div>
   );
}


export function BasketMain() {
   const totalPrice = 3309493;
   return (
      <>
         <div className="container mx-auto ">
            <div className="flex justify-between align-center">
               <h1 className="text-4xl font-semibold mb-6">Моя корзина</h1>
               <WhiteButton className='flex justify-center items-center px-4 py-2'><Link to='/'>Продолжить покупки</Link></WhiteButton>
            </div>
            <CartItem onUpdateQuantity={20} price={10000} title={'Iphone rx 3500'} idProduct={'3490387208'} categories={'Телефоны и аксесуары'} />
            <CartItem onUpdateQuantity={4} price={39398} title={'Клавиатура на мембране'} idProduct={'3208490832084908'} categories={'Клавиатуры и Мыши'} />
            <CartItem onUpdateQuantity={7} price={560390} title={'Наушники Sony air Bach'} idProduct={'34985439580'} categories={'Наушники и Аксессуары'} />
            <CartItem onUpdateQuantity={9} price={308419} title={'Адаптер'} idProduct={'12348239432'} categories={'Сетевое оборудование'} />
            <CartItem onUpdateQuantity={6} price={178456} title={'Видео карта RX-3080 it'} idProduct={'09868902635'} categories={'Комплектующие'} />
         </div>
         <div className="flex justify-end mt-10">
            <div className="bg-orange-100 rounded-lg p-4 pr-24 flex align-center items-center  gap-4">
               <h3 className='font-bold text-xl'>Итог к оплате</h3>
               <span className="font-bold text-2xl">
                  {totalPrice.toLocaleString('ru-RU')}
               </span>
               <Link to='/api/basket/checkout'>
                  <ButtonL name={'Оформить заказ'} />
               </Link>
            </div>
         </div>
      </>
   );
}
