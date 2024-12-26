import React, { useState } from 'react';
import Modal from './Modal';
import ButtonLink from '../buttons/buttonLink/buttonLink';
import PasswordField from '../PasswordField/PasswordField';
import { Link } from 'react-router-dom';


const LoginModal = ({ isOpen, onClose }) => {
   return (
      <Modal isOpen={isOpen} onClose={onClose}>
         <section className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-3xl">Войти</h2>
            <button className="close-btn" onClick={onClose}>×</button>
         </section>
         <ButtonLink />
         <div className="w-full flex justify-center items-center my-2 divider">или</div>
         <form action="#" className="flex flex-col items-center justify-center gap-6">
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
            <button type="submit" className="submitButton w-full">Войти</button>
            <div className="w-full text-right text-gray-500"><Link path='/'>Забыли пароль?</Link></div>
            <div className="w-full text-left text-gray-500">
               Нету аккаунта, но хотите иметь свой аккаунт? <br />
               <span className='mt-2 font-bold hover:underline'>
                  Зарегистрироваться
               </span>
            </div>
         </form>
      </Modal>
   );
};

export default LoginModal;