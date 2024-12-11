import React from 'react';
import Modal from './Modal';
import PasswordField from './PasswordField/PasswordField';
import ButtonLink from '../buttons/buttonLink/buttonLink';

const RegistrationModal = ({ isOpen, onClose }) => {
   return (
      <Modal isOpen={isOpen} onClose={onClose}>
         <section className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-3xl">Регистрация</h2>
            <button className="close-btn" onClick={onClose}>×</button>
         </section>
         <ButtonLink />
         <div className="w-full flex justify-center items-center my-6 divider">или</div>
         <form action="#" className="flex flex-col items-center justify-center gap-6">
            <div className="w-full">
               <label htmlFor="fullname" className='modal__comment-title'>Имя, Фамилия</label>
               <input type="text" placeholder='Владимир Зеленский' className="w-full p-2 mt-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none" id="fullname" />
            </div>
            <div className="w-full">
               <label htmlFor="email" className='modal__comment-title'>Електронная почта</label>
               <input
                  type="email"
                  placeholder="example@mail.com"
                  className="w-full p-2 mt-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  id="email"
                  autoComplete="username"
               />
            </div>
            <PasswordField />
            <button type="submit" className="submitButton w-full">Зареестрироватся</button>
         </form>
      </Modal>
   );
};

export default RegistrationModal;