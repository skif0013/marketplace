import React from 'react';
import WhiteButton from '../WhiteButton/WhiteButton'; // Импорт кнопки

export default function ButtonLink() {
   function google() {
      console.log('click button Google');
   }

   return (
      <WhiteButton onClick={google}>
         <div className="flex items-center justify-center w-full my-2">
            <span>Google</span>
         </div>
      </WhiteButton>
   )
}