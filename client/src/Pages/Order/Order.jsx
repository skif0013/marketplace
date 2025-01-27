import MainLayout from '../../layouts/main';
import CartItem from '../../components/goods/CartItem/CartItem';
import WhiteButton from '../../components/buttons/WhiteButton/WhiteButton';
import ButtonLink from '../../components/buttons/buttonLink/buttonLink';
import { ButtonProduct } from '../../components/buttons/button';

import { Link } from 'react-router-dom';

export default function OrderCheckout() {
   return (
      <MainLayout body='flex flex-col min-h-screen'>
         <div className="container mx-auto my-auto">
            <div className="flex justify-between items-center mt-12">
               <h1 className="text-4xl font-semibold mb-6">Оформление заказа</h1>
               <WhiteButton className="flex justify-center items-center px-4 py-2">
                  <Link to="/">Продолжить покупки</Link>
               </WhiteButton>
            </div>
            <div className="grid grid-cols-12 gap-2 mt-6">
               <section className="bg-orange-100 col-span-8 p-4">
                  <form action="#" method="post" className="flex flex-col items-center w-4/5 mx-auto">
                     <h2 className="text-2xl font-semibold text-center mb-6">Мои данные</h2>
                     <div className="w-full mb-4">
                        <ButtonLink />
                     </div>
                     <div className="w-full my-2 text-center text-gray-500">или</div>
                     <div className="w-full mb-6">
                        <label htmlFor="fullname" className="block text-xl font-bold text-black-700">Имя, Фамилия</label>
                        <input
                           type="text"
                           id="fullname"
                           placeholder="Владимир Зеленский"
                           className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                     </div>
                     <div className="w-full mb-6">
                        <label htmlFor="email" className="block text-xl font-bold text-black-700">Електронная почта</label>
                        <input
                           type="email"
                           id="email"
                           placeholder="example@mail.com"
                           className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                           autoComplete="username"
                        />
                     </div>
                     <button type="submit" className="submitButton w-full mb-10">Зареестрироватся</button>

                  </form>

               </section>
               <div className='col-span-4'>
                  <section className="bg-orange-100 p-8">
                     <h2 className="text-2xl font-bold mb-6">Итог к оплате</h2>
                     <section className="grid grid-cols-12 gap-4 mb-8 font-bold">
                        <span className="col-span-8">5 товаров</span>
                        <span className="text-xl">10,309,489</span>
                        <span className="col-span-8">К оплате</span>
                        <span className="text-2xl">3090</span>
                     </section>
                     <ButtonProduct name="Оформление заказа" />
                  </section>
               </div>

               <section className="bg-orange-100 col-span-8 p-4 mb-12">
                  <h2 className="text-2xl">Мои заказы</h2>
                  <CartItem onUpdateQuantity={20} price={10000} title={'Iphone rx 3500'} idProduct={'3490387208'} categories={'Телефоны и аксесуары'} />
                  <CartItem onUpdateQuantity={4} price={39398} title={'Клавиатура на мембране'} idProduct={'3208490832084908'} categories={'Клавиатуры и Мыши'} />
                  <CartItem onUpdateQuantity={7} price={560390} title={'Наушники Sony air Bach'} idProduct={'34985439580'} categories={'Наушники и Аксессуары'} />
                  <CartItem onUpdateQuantity={9} price={308419} title={'Адаптер'} idProduct={'12348239432'} categories={'Сетевое оборудование'} />
                  <CartItem onUpdateQuantity={6} price={178456} title={'Видео карта RX-3080 it'} idProduct={'09868902635'} categories={'Комплектующие'} />
               </section>
            </div>
         </div >
      </MainLayout>
   )
}

export function OrderCompleted() {
   return (
      <MainLayout body="flex flex-col items-center justify-center h-screen bg-orange-50 text-gray-600 font-sans text-center">
         <div className="w-20 h-20 mb-5">
            <img src="/images/variable/basket/BasketCompleted.svg" alt="Иконка с галочкой" className="w-full h-full object-contain" />
         </div>
         <h1 className="text-2xl font-bold mb-5">Поздравляем</h1>
         <h2 className="text-xl font-normal mb-2">Ваш заказ принят</h2>
         <div className=" text-gray-600 px-4 py-2 rounded-lg text-lg mb-5">
            Номер заказа <span className="font-bold">27890162</span>
         </div>
         <p className="text-base text-gray-400 mb-8">
            Спасибо вам за покупку! Вся детальная информация о заказе уже отправлена вам на почту.
         </p>
         <Link to='/'>
            <ButtonL name={'Продолжить покупки'} />
         </Link>
      </MainLayout>
   )
}