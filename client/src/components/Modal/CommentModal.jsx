import React, { useEffect, useState } from 'react';
import Modal from './Modal';
import RatingSystem from '../RatingSystem/RatingSystem';
import axios from 'axios';

const CommentModal = ({ isOpen, onClose, idProduct }) => {
   const [comment, setComment] = useState('');
   const [pluses, setPluses] = useState('');
   const [minuses, setMinuses] = useState('');
   const [formValid, setFormValid] = useState(false);
   const [grade, setGrade] = useState(0);
   const productId = idProduct;

   // Валидация полей перед отправкой формы
   const validateFields = () => {
      return comment.trim() && pluses.trim() && minuses.trim();
   };

   // Обновление валидности формы
   useEffect(() => {
      setFormValid(validateFields());
   }, [comment, pluses, minuses]);

   // Обработчик для комментариев
   const handleComment = (e) => {
      setComment(e.target.value);
   };

   // Обработчик для плюсов
   const handlePluses = (e) => {
      setPluses(e.target.value);
   };

   // Обработчик для минусов
   const handleMinuse = (e) => {
      setMinuses(e.target.value);
   };

   // Обработчик изменения рейтинга
   const handleRatingChange = (newRating) => {
      setGrade(newRating); // Обновляем рейтинг
   };

   // Отправка формы
   const handleSubmit = async (e) => {
      e.preventDefault();
      if (formValid) {
         const userComment = {
            Grade: grade,
            ProductId: Number(productId),
            Pluses: pluses,
            Minuses: minuses,
            Content: comment
         };
         const refreshToken = localStorage.getItem('refreshToken');
         try {
            await axios.post(
               'https://marketplace-800v.onrender.com/api/Products/coments',
               userComment,
               {
                  headers: {
                     'accept': '*/*',
                     'Content-Type': 'multipart/form-data',
                     Authorization: `Bearer ${refreshToken}`
                  }
               }               
            );
            onClose();
            window.location.reload();
         } catch (error) {
            console.log(error);
         }
      } else {
         console.log('Форма не валидна');
      }
   };

   return (
      <Modal isOpen={isOpen} onClose={onClose}>
         <div className="p-3">
            <section className="flex justify-between items-center mb-4">
               <h2 className="font-bold text-3xl">Оставить комментарий</h2>
               <button className="close-btn" onClick={onClose}>×</button>
            </section>

            <label className="modal__comment-title">Оцените товар</label>
            <div className="p-4 flex gap-4 items-center justify-between">
               <RatingSystem
                  initialRating={3}
                  maxStars={5}
                  onRatingChange={handleRatingChange}
               />
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center gap-3">
               {/* Плюсы товара */}
               <div className="w-full">
                  <label htmlFor="comments-pluses" className="modal__comment-title">Плюсы товара</label>
                  <input
                     type="text"
                     value={pluses}
                     onChange={handlePluses}
                     autoComplete='pluses'
                     id="comments-pluses"
                     name="pluses"
                     placeholder="Укажите плюсы товара"
                     className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  />
               </div>

               {/* Минусы товара */}
               <div className="w-full">
                  <label htmlFor="minuses" className="modal__comment-title">Минусы товара</label>
                  <input
                     type="text"
                     value={minuses}
                     onChange={handleMinuse}
                     id="minuses"
                     name="minuses"
                     placeholder="Укажите минусы товара"
                     className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  />
               </div>

               {/* Комментарии */}
               <div className="w-full">
                  <label htmlFor="comments" className="modal__comment-title">Комментарии</label>
                  <textarea
                     id="comment"
                     name="comment"
                     value={comment}
                     onChange={handleComment}
                     placeholder="Основные комментарии"
                     className="custom-textarea focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  />
               </div>

               <button
                  type="submit"
                  className={`w-full py-4 font-bold text-base rounded-lg ${formValid
                     ? "submitButton"
                     : "bg-orange-300 cursor-not-allowed text-gray-500"
                     }`}
                  disabled={!formValid}
               >
                  Оставить отзыв
               </button>
            </form>
         </div>
      </Modal>
   );
};

export default CommentModal;