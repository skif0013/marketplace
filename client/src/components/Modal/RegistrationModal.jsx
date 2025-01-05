import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal';
import PasswordField from '../PasswordField/PasswordField';
import ButtonLink from '../buttons/buttonLink/buttonLink';
import { OpenModal } from '../../utils/CheckAuth/CheckAuth';


const RegistrationModal = ({ isOpen, onClose }) => {
   if (!isOpen) return null;

   //Для обработки входных данных
   const [email, setEmail] = useState('');
   const [emailError, setEmailError] = useState('Email не может быть пустым');
   const [fullName, setFullName] = useState('');
   const [fullNameError, setFullNameError] = useState('Имя не может быть пустым');
   const [password, setPassword] = useState('');
   const [passwordError, setPasswordError] = useState('Пароль не может быть пустым');
   const [confirmPassword, setConfirmPassword] = useState('');
   const [confirmPasswordError, setConfirmPasswordError] = useState('Повторите пароль');
   const [message, setMessage] = useState('');
   const [formValid, setFormValid] = useState(false);
   const navigate = useNavigate();

   //Для работы с модальным окном
   const [triggerModal, setTriggerModal] = useState(false);
   const handleOpenModal = () => {
      return setTriggerModal(true);
   };

   //Обновление сообщения
   let updateMessage = () => {
      return setMessage('Такой пользовать уже существует.');
   }

   //если не все данные будут заполнинны кнопка "Зарегестрироваться" не будет работать
   useEffect(() => {
      if (emailError || fullNameError || passwordError || confirmPasswordError) {
         setFormValid(false);
      } else {
         setFormValid(true);
      }
   }, [emailError, fullNameError, passwordError, confirmPasswordError]);

   const validateField = (name, value) => {
      switch (name) {
         case 'fullName':
            if (!value) return 'Имя не может быть пустым';
            const fullNameRegEx = /^[a-zA-Zа-яА-Я\s]+$/; // Проверка на допустимые символы
            if (!fullNameRegEx.test(value)) return 'Имя должно содержать только буквы';
            return '';
         case 'email':
            if (!value) return 'Email не может быть пустым';
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!re.test(value.toLowerCase())) return 'Некорректный email';
            return '';
         case 'password':
            if (!value) return 'Пароль не может быть пустым';
            if (value.length < 6) return 'Пароль должен быть не менее 6 символов';
            return '';
         case 'confirmPassword':
            if (!value) return 'Повторите пароль';
            if (value !== password) return 'Пароли не совпадают';
            return '';
         default:
            return '';
      }
   };

   const fullNameHandler = (e) => {
      const value = e.target.value;
      setFullName(value);
      setFullNameError(validateField('fullName', value));
   };

   const emailHandler = (e) => {
      const value = e.target.value;
      setEmail(value);
      setEmailError(validateField('email', value));
   };

   const passwordHandler = (e) => {
      const value = e.target.value;
      setPassword(value);
      setPasswordError(validateField('password', value));
   };

   const confirmPasswordHandler = (e) => {
      const value = e.target.value;
      setConfirmPassword(value);
      setConfirmPasswordError(validateField('confirmPassword', value));
   };

   //Проверка и отправка данных
   const handleSubmit = async (e) => {
      e.preventDefault();
      if (formValid) {
         const userData = {
            name: fullName,
            email: email,
            password: password
         };

         try {
            const response = await axios.post('https://www.apishka.somee.com/api/auth/reg', userData, {
               headers: {
                  'Content-Type': 'application/json',
                  'accept': '*/*'
               }
            });
            localStorage.setItem('accessToken', response.data.accessToken);
            navigate('/profile');
         } catch (error) {
            if (error.response && error.response.status === 400) {
               updateMessage();
               setFormValid(false);
            }
         }
      }
   };

   return (
      <>
         <Modal isOpen={isOpen} onClose={onClose}>
            <section className="flex justify-between items-center mb-4">
               <h2 className="font-bold text-3xl">Регистрация</h2>
               <button className="close-btn" onClick={onClose}>×</button>
            </section>
            <ButtonLink />
            <div className="w-full flex justify-center items-center divider">или</div>
            <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center gap-4">
               <div className="w-full">
                  <label htmlFor="fullname" className="modal__comment-title">Имя, Фамилия</label>
                  <input
                     type="text"
                     id="fullname_1"
                     value={fullName}
                     onChange={fullNameHandler}
                     placeholder="Ф.И.О"
                     autoComplete='name'
                     className="w-full p-2 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  />
                  {fullNameError && <p className='text-xs text-red-600 mt-2'>{fullNameError}</p>}
               </div>

               <div className="w-full">
                  <label htmlFor="email" className="modal__comment-title">Электронная почта</label>
                  <input
                     id='email'
                     name="email"
                     type="email"
                     value={email}
                     onChange={emailHandler}
                     autoComplete='email'
                     placeholder="example@mail.com"
                     className="w-full p-2 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  />
                  {emailError && <p className="text-xs text-red-600 mt-2">{emailError}</p>}
               </div>

               <PasswordField
                  password={password}
                  confirmPassword={confirmPassword}
                  onPasswordChange={passwordHandler}
                  onConfirmPasswordChange={confirmPasswordHandler}
                  passwordError={passwordError}
                  confirmPasswordError={confirmPasswordError}
               />
               <button
                  type="submit"
                  className={`w-full py-4 font-bold text-base rounded-lg ${formValid
                     ? "submitButton"
                     : "bg-orange-300 cursor-not-allowed text-gray-500"
                     }`}
                  disabled={!formValid}
               >
                  Зарегистрироваться
               </button>

               {message && <div className='text-left text-gray-500 transition-all'>{message} <button className='text-orange-500' onClick={handleOpenModal}>Войти</button></div>}
            </form>
         </Modal>

         <OpenModal triggerModal={triggerModal} defaultModalType='login' />
      </>
   );
};

export default RegistrationModal;