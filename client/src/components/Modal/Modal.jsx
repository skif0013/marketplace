import React, { useEffect } from 'react';
import './Modal.css'; 

const Modal = ({ isOpen, onClose, children }) => {
   useEffect(() => {
      // Блокировка прокрутки страницы при открытии модалки
      if (isOpen) {
         document.body.style.overflow = 'hidden'; // Блокируем прокрутку
      } else {
         document.body.style.overflow = 'auto'; // Включаем прокрутку
      }

      // Очистка при размонтировании компонента
      return () => {
         document.body.style.overflow = 'auto'; // Включаем прокрутку при размонтировании
      };
   }, [isOpen]); // Срабатывает каждый раз, когда isOpen меняется

   return (
      <div className={`modal-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}>
         <div
            className={`modal-content ${isOpen ? 'fade-in' : ''} p-6`}
            onClick={(e) => e.stopPropagation()} // Останавливаем клик от закрытия при клике внутри модалки
         >
            {children}
         </div>
      </div>
   );
};


export default Modal;