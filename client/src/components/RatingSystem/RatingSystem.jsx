import React, { useState } from "react";

const RatingSystem = ({ initialRating = 0, maxStars = 5, onRatingChange }) => {
   const starFill = '/images/goods/star-fill.jpeg';
   const starTransparency = '/images/goods/star-transparency.png';

   const [rating, setRating] = useState(initialRating);

   const handleRating = (index) => {
      const newRating = index + 1;
      setRating(newRating);
      onRatingChange(newRating); // Передаём новое значение рейтинга в родительский компонент
   };

   return (
      <>
         {[...Array(maxStars)].map((_, index) => (
            <img
               key={index}
               src={index < rating ? starFill : starTransparency}
               alt={`Star ${index + 1}`}
               className="w-8 h-8 cursor-pointer"
               onClick={() => handleRating(index)}
            />
         ))}
      </>
   );
};

export default RatingSystem;