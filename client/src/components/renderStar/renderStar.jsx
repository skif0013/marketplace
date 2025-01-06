import React from 'react';

const starFill = '/images/goods/star-fill.png';
const starTransparency = '/images/goods/star-transparency.png';

export const renderStars = (product) => {
   // Получаем количество звезд
   const fullStars = product.grade;
   const stars = [];

   for (let i = 1; i <= 5; i++) {
      stars.push(
         <img
            key={i}
            src={i <= fullStars ? starFill : starTransparency}
            alt="star"
            className="w-5 h-5"
         />
      );
   }

   return stars;
};