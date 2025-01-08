import React, { useEffect, useState } from 'react';
import Modal from './Modal';
import RatingSystem from '../RatingSystem/RatingSystem';
import axios from 'axios';

const CommentModal = ({ isOpen, onClose, idProduct }) => {
   const [comment, setComment] = useState('');
   const [emptyComment, setEmptyComment] = useState('');
   const [pluses, setPluses] = useState('');
   const [emptyPluses, setEmptyPluses] = useState('');
   const [minuses, setMinuses] = useState('');
   const [emptyMinuses, setEmptyMinuses] = useState('');
   const [formValid, setFormValid] = useState(false);
   const productId = idProduct;

   //Обработка ввода данных в поля
   useEffect(() => {
      if (emptyComment || emptyPluses || emptyMinuses) {
         setFormValid(false);
      } else {
         setFormValid(true)
      }
   }, [emptyComment, emptyPluses, emptyMinuses]);

   //Валидация полей
   const validateField = (name, value) => {
      switch (name) {
         case 'comment':
            if (!value) return 'Коментарии не может быть пустым';
            break;
         case 'pluses':
            if (!value) return 'Коментарии не может быть пустым';
            break;
         case 'minuses':
            if (!value) return 'Коментарии не может быть пустым';
            break;
         default:
            return '';
      }
   };

   const handleComment = (e) => {};
   const handlePluses = (e) => {};
   const handleMinuse= (e) => {};

   //Добавление коментарий
   const handleSubmit = async (e) => {
      e.preventDefault();
      if (formValid) {
         const userComment = {
            comment: comment,
            ProductId: productId,
            Pluses: '',
            Minuses: '',
         }
         console.log(userComment);
         // try {
         // const response = axios.post('https://marketplace-800v.onrender.com/api/product/add', userComment, {
         // headers: {
         // 'Content-Type': 'multipart/form-data',
         // 'accept': '*/*'
         // }
         // });
         // console.log(response);
         // 
         // } catch (error) {
         // console.log(error);
         // }
      }
   }


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
                  initialRating={3} // Устанавливаем начальный рейтинг
                  maxStars={5} // Количество звезд (по умолчанию 5)
               />
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center gap-3">
               {/* Product Plus and Minus */}
               <div className="w-full">
                  <label htmlFor="comments-pluses" className="modal__comment-title">Плюсы товара</label>
                  <input
                     type="text"
                     value={pluses}
                     onChange={handlePluses}
                     id="comments-pluses"
                     name="comments-pluses"
                     placeholder="Укажите плюсы товара"
                     className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  />
                  {emptyPluses && <p className="font-bold text-xs text-red-600">Что-то пошло не так</p>}
               </div>

               <div className="w-full">
                  <label htmlFor="comments-minuses" className="modal__comment-title">Минусы товара</label>
                  <input
                     type="text"
                     value={minuses}
                     onChange={handleMinuse}
                     id="comments-minuses"
                     name="comments-minuses"
                     placeholder="Укажите минусы товара"
                     className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  />
                  {emptyMinuses && <p className="font-bold text-xs text-red-600">{emptyMinuses}</p>}
               </div>

               {/* Добавление коментариев */}
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
                  {emptyComment && <p className="font-bold text-xs text-red-600">{emptyComment}</p>}
               </div>

               <div className="w-full">
                  <label htmlFor="addFile" className="modal__comment-title">
                     Добавить фото
                  </label>
                  <p className="text-sm text-gray-500">
                     Перетащите файлы сюда или нажмите на кнопку. Добавляйте до <br />
                     10 изображений в форматах .jpg, .gif, .png, размером файла до 5 <br />
                     МБ
                  </p>
               </div>

               {/* File Upload Section */}
               <div className="w-full">
                  <input
                     type="file"
                     name="addFile"
                     id="addFile"
                     className="hidden"
                     multiple
                  />
                  <label
                     htmlFor="addFile"
                     className="cursor-pointer border-orange-600 border text-black flex justify-center py-2 my-3 rounded-full w-full sm:w-auto"
                  >
                     Выбрать файл
                  </label>
                  {/* {messageError && <p className="font-bold text-red-600">Что-то пошло не так</p>} */}
               </div>
               <button
                  type="submit"
                  className={`w-full py-4 font-bold text-base rounded-lg ${formValid ? 'submitButton' : 'bg-orange-300 cursor-not-allowed text-gray-500'}`}
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