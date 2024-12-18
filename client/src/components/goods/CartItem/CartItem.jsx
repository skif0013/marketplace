import React from 'react';
import './CartItem.css'

export default function CartItem({ idProduct, title, price, quantity, onRemove, onUpdateQuantity, categories }) {
   return (
      <div className="cart-item mb-4 flex justify-between items-center p-4 border-b">
         <div>
            <h3>{title}</h3>
            <p>{categories}</p>
         </div>
         <div className="flex items-center gap-4">
            <span>{price.toLocaleString('ru-RU')}₽</span>
            <div className="flex items-center gap-2">
               <button
                  className="button-minus"
                  onClick={() => onUpdateQuantity(idProduct, -1)}
               >
                  -
               </button>
               <span>{quantity}</span>
               <button
                  className="button-plus"
                  onClick={() => onUpdateQuantity(idProduct, 1)}
               >
                  +
               </button>
            </div>
            <button
               className="button-remove"
               onClick={onRemove}
            >
               Удалить
            </button>
         </div>
      </div>
   );
}
