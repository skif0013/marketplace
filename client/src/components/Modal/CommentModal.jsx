import React from 'react';
import Modal from './Modal';
import RatingSystem from '../RatingSystem/RatingSystem';
import axios from 'axios';

const CommentModal = ({ isOpen, onClose, idProduct }) => {


   //Добавление коментарий
   const handleSubmit = async (e) => {
      e.preventDefault();
      userComment = {
         Content: '',
         ProductId: idProduct,
         Pluses: '',
         Minuses: ''
      }
      console.log(userComment);
      
      try {
         const response = axios.post('https://marketplace-800v.onrender.com/api/product/add', userComment, {
            headers: {
               'Content-Type': 'multipart/form-data',
               'accept': '*/*'
            }
         });
         console.log(response);

      } catch (error) {
         console.log(error);

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
            <div className="mb-4 p-4 flex gap-4 items-center justify-between">
               <RatingSystem
                  initialRating={3} // Устанавливаем начальный рейтинг
                  maxStars={5} // Количество звезд (по умолчанию 5)
               />
            </div>

            <form action="#" className="flex flex-col items-center justify-center gap-3">
               {/* Product Plus and Minus */}
               <div className="w-full">
                  <label htmlFor="comments-pluses" className="modal__comment-title">Плюсы товара</label>
                  <input
                     type="text"
                     id="comments-pluses"
                     name="comments-pluses"
                     placeholder="Укажите плюсы товара"
                     className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  />
               </div>

               <div className="w-full">
                  <label htmlFor="comments-minuses" className="modal__comment-title">Минусы товара</label>
                  <input
                     type="text"
                     id="comments-minuses"
                     name="comments-minuses"
                     placeholder="Укажите минусы товара"
                     className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  />
               </div>

               <div className="w-full">
                  <label htmlFor="comments" className="modal__comment-title">Комментарии</label>
                  <textarea
                     id="comments"
                     name="comments"
                     placeholder="Основные комментарии"
                     className="custom-textarea focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  />
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

               </div>
               {/* Submit Button */}
               <button type="submit" className="submitButton w-full">Оставить отзыв</button>
            </form>
         </div>
      </Modal>
   );
};

export default CommentModal;