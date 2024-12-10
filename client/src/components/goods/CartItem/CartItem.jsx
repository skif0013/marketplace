// CartItem.jsx
import React from 'react';
import WhiteButton from '../../buttons/WhiteButton/WhiteButton';
import InputMain from '../../Input/Input';
import './CartItem.css';


const CartItem = ({ title, idProduct, categories, onUpdateQuantity, price }) => {

   return (
      <>
         <div className="container mx-auto bg-orange-100 p-6 my-6 flex justify-between items-center">
            <div className='flex gap-14 items-center'>
               <img src="/images/goods/iphone.jpeg" alt="Image" className="w-55 h-55 object-cover rounded-lg" />
               <div className='info'>
                  <h4 className="font-bold text-2xl mb-2">{title}</h4>
                  <p className="text-gray-500 mb-2 ">{categories}</p>
                  <p className="text-gray-500 ">ID: {idProduct}</p>
                  <div className='flex gap-2 mt-2 items-center quantity'>
                     <button>-</button>
                     <InputMain placeholder={'100'} value={onUpdateQuantity} type={'number'} />
                     <button>+</button>
                  </div>
               </div>
            </div>
            <div className="items-center flex gap-6">
               <span className='font-bold text-3xl priceItem'>
                  {price.toLocaleString('ru-RU')}
               </span>
               <WhiteButton className='flex justify-center items-center px-4 py-2 font-600'>Удалить</WhiteButton>
            </div>
         </div>
      </>
   );
};

export default CartItem;
