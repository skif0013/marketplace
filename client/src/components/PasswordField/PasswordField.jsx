import React, { useState } from 'react';

const PasswordInput = () => {
   const [showPassword, setShowPassword] = useState(false);

   const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
   };

   return (
      <div className="w-full">
         <label htmlFor="password" className="modal__comment-title">Пароль</label>
         <div className="relative">
            <input
               type={showPassword ? 'text' : 'password'}
               name="new-password"
               placeholder="Введите пароль"
               className="w-full p-2 mt-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
               id="password"
               autoComplete="new-password"
            />
            <button
               type="button"
               onClick={togglePasswordVisibility}
               style={{
                  top: '40px',
                  right: '10px'
               }}
               className="absolute transform -translate-y-1/2 text-gray-500"
            >
               {showPassword ? (
                  <img src="/images/main/variable/eyes/eyePress.png" width='35px' height='35px' alt="" />
               ) : (
                  <img src="/images/main/variable/eyes/eye.svg" width='35px' height='35px' alt="" />
               )}
            </button>
         </div>
      </div>
   );
};

const PasswordConfirmInput = () => {
   const [showPassword, setShowPassword] = useState(false);

   const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
   };

   return (
      <div className="w-full">
         <label htmlFor="password_confirm" className="modal__comment-title">Повтор пароля</label>
         <div className="relative">
            <input
               type={showPassword ? 'text' : 'password'}
               placeholder="Повтор пароля"
               className="w-full p-2 mt-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
               id="password_confirm"
               autoComplete="new-password"
            />
            <button
               type="button"
               onClick={togglePasswordVisibility}
               style={{
                  top: '40px',
                  right: '10px'
               }}
               className="absolute transform -translate-y-1/2 text-gray-500"
            >
               {showPassword ? (
                  <img src="/images/main/variable/eyes/eyePress.png" width='35px' height='35px' alt="" />
               ) : (
                  <img src="/images/main/variable/eyes/eye.svg" width='35px' height='35px' alt="" />
               )}
            </button>
         </div>
      </div>
   );
};

const PasswordField = () => {
   return (
      <>
         <PasswordInput />
         <PasswordConfirmInput />
      </>
   );
};

export default PasswordField;