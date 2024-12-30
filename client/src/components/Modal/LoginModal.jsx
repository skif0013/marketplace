import axios from 'axios';
import Modal from './Modal';
import React, { useState, useEffect } from 'react';
import ButtonLink from '../buttons/buttonLink/buttonLink';
import { Link, useNavigate } from 'react-router-dom';
import RegistrationModal from './RegistrationModal';
import { useModal } from '../../hooks/useModal';


const LoginModal = ({ isOpen, onClose }) => {
   const [fullName, setFullName] = useState('');
   const [fullNameError, setFullNameError] = useState('Имя не может быть пустым');
   const [email, setEmail] = useState('');
   const [emailError, setEmailError] = useState('Email не может быть пустым');
   const [password, setPassword] = useState('');
   const [passwordError, setPasswordError] = useState('Пароль не может быть пустым');
   const [message, setMessage] = useState('');
   const { isModalOpen, modalType, openModal, closeModal } = useModal();
   const [formValid, setFormValid] = useState(false);
   const navigate = useNavigate();

   const [showPassword, setShowPassword] = useState(false);
   const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
   };

   //Переключение между модальными окнами   
   const handleClick = (event) => {
      event.preventDefault();
      openModal('register')
   };

   //Если формы не заполнены код дальше не будет работать
   useEffect(() => {
      setFormValid(!emailError && !passwordError);
   }, [emailError, passwordError]);

   const validateField = (name, value) => {
      switch (name) {
         case 'fullName':
            if (!value) return 'Имя не может быть пустым';
            const fullNameRegEx = /^[a-zA-Zа-яА-Я\s]+$/; // Проверка на допустимые символы
            if (!fullNameRegEx.test(value)) return 'Имя должно содержать только буквы';
            return '';
         case 'email':
            if (!value) return 'Email не может быть пустым';
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(value.toLowerCase()) ? '' : 'Некорректный email';
         case 'password':
            if (!value) return 'Пароль не может быть пустым';
            return value.length >= 6 ? '' : 'Пароль должен быть не менее 6 символов';
         default:
            return '';
      }
   };

   const handleInputChange = (setter, validator, fieldName) => (e) => {
      const value = e.target.value;
      setter(value);
      validator(fieldName, value);
   };

   const fullNameHandler = (e) => {
      const value = e.target.value;
      setFullName(value);
      setFullNameError(validateField('fullName', value));
   };
   const emailHandler = handleInputChange(setEmail, (field, value) => setEmailError(validateField(field, value)), 'email');
   const passwordHandler = handleInputChange(setPassword, (field, value) => setPasswordError(validateField(field, value)), 'password');

   const handleSubmit = async (e) => {
      e.preventDefault();
      if (formValid) {
         const userData = {
            name: fullName,
            email: email,
            password: password
         };
         try {
            const response = await axios.post('https://marketplace-800v.onrender.com/api/auth/singIn', userData, {
               headers: {
                  'accept': '*/*',
                  'Content-Type': 'multipart/form-data'  // Обязательно указываем, что данные отправляются в формате multipart/form-data
               }
            });

            localStorage.setItem('accessToken', response.data.accessToken);
            localStorage.setItem('refreshToken', response.data.refreshToken);
            navigate('/profile');
         } catch (error) {
            if (error.status === 400) {
               //Обновление сообщения
               let updateMessage = () => {
                  setFormValid(false);
                  return setMessage('Такого пользователя нету.');
               }
               updateMessage();
            } else {
               console.error('Произошла ошибка:', error);
            }
         }
      } else {
         console.warn('Форма невалидна');
      }
   };

   return (
      <>
         <Modal isOpen={isOpen} onClose={onClose}>
            <section className="flex justify-between items-center mb-4">
               <h2 className="font-bold text-3xl">Войти</h2>
               <button className="close-btn" onClick={onClose}>
                  ×
               </button>
            </section>
            <ButtonLink />
            <div className="w-full flex justify-center items-center my-2 divider">или</div>
            <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center gap-2">
               <div className="w-full">
                  <label htmlFor="fullname" className="modal__comment-title">Имя, Фамилия</label>
                  <input
                     type="text"
                     id="fullname"
                     value={fullName}
                     onChange={fullNameHandler}
                     placeholder="Ф.И.О"
                     autoComplete='name'
                     className="w-full p-2 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  />
                  {fullNameError && <p className='text-xs text-red-600 mt-2'>{fullNameError}</p>}
               </div>
               <div className="w-full">
                  <label className="modal__comment-title">
                     Электронная почта
                  </label>
                  <input
                     name="email"
                     type="email"
                     value={email}
                     onChange={emailHandler}
                     autoComplete="email"
                     placeholder="example@mail.com"
                     className="w-full p-2 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  />
                  {emailError && <p className="text-xs text-red-600 mt-2">{emailError}</p>}
               </div>
               <div className="w-full mb-4 relative">
                  <label htmlFor="password" className="modal__comment-title">Пароль</label>
                  <input
                     type={showPassword ? "text" : "password"}
                     id="password"
                     value={password}
                     onChange={passwordHandler}
                     placeholder="Введите ваш пароль"
                     autoComplete="current-password"
                     className="w-full p-2 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  />
                  {passwordError && <p className="text-xs text-red-600 mt-2">{passwordError}</p>}
                  <button
                     type="button"
                     onClick={togglePasswordVisibility}
                     style={{
                        top: '70%',
                        right: '10px'
                     }}
                     className="absolute transform -translate-y-1/2 text-gray-500"
                  >
                     {showPassword ? (
                        <img src="/images/main/variable/eyes/eyePress.png" width="35px" height="35px" alt="Show password" />
                     ) : (
                        <img src="/images/main/variable/eyes/eye.svg" width="35px" height="35px" alt="Hide password" />
                     )}
                  </button>
               </div>
               <button
                  type="submit"
                  className={`w-full py-4 font-bold text-base rounded-lg ${formValid ? 'submitButton' : 'bg-orange-300 cursor-not-allowed text-gray-500'}`}
                  disabled={!formValid}
               >
                  Войти
               </button>
               {message && <div className="w-full"><p className="text-red-600 font-bold text-left text-xl">{message}</p></div>}
               <div className="w-full text-right text-gray-500">
                  <Link to="/errors">Забыли пароль?</Link>
               </div>
               <div className="w-full text-left text-gray-500">
                  Нету аккаунта, но хотите иметь свой аккаунт? <br />
                  <button
                     onClick={handleClick}
                     type="button"
                     className="mt-2 font-bold hover:underline hover:text-orange-500"
                  >
                     Зарегистрироваться
                  </button>
               </div>
            </form>
         </Modal>
         {modalType && <RegistrationModal isOpen={isModalOpen} onClose={closeModal} />}
      </>
   );
};

export default LoginModal;