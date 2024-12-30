import React, { useState } from 'react';

const PasswordField = ({
   password,
   confirmPassword,
   onPasswordChange,
   onConfirmPasswordChange,
   passwordError,
   confirmPasswordError
}) => {
   const [showPassword, setShowPassword] = useState(false);
   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

   const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
   };

   const toggleConfirmPasswordVisibility = () => {
      setShowConfirmPassword(!showConfirmPassword);
   };

   return (
      <>
         {/* Поле для пароля */}
         <div className="w-full">
            <label htmlFor="password" className="modal__comment-title">Пароль</label>
            <div className="relative">
               <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={onPasswordChange}
                  placeholder="Введите пароль"
                  className="w-full p-2 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  id="password"
                  autoComplete='password'
               />
               <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  style={{
                     top: '35px',
                     right: '10px'
                  }}
                  className="absolute transform -translate-y-1/2 text-gray-500"
               >
                  {showPassword ? (
                     <img src="/images/main/variable/eyes/eyePress.png" width='35px' height='35px' alt="Show password" />
                  ) : (
                     <img src="/images/main/variable/eyes/eye.svg" width='35px' height='35px' alt="Hide password" />
                  )}
               </button>
            </div>
            {passwordError && <p className="text-xs text-red-600 mt-2">{passwordError}</p>}
         </div>

         {/* Поле для подтверждения пароля */}
         <div className="w-full">
            <label htmlFor="password_confirm" className="modal__comment-title">Повтор пароля</label>
            <div className="relative">
               <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={onConfirmPasswordChange}
                  placeholder="Повтор пароля"
                  className="w-full p-2 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  id="password_confirm"
                  autoComplete='new-password'
               />
               <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  style={{
                     top: '35px',
                     right: '10px'
                  }}
                  className="absolute transform -translate-y-1/2 text-gray-500"
               >
                  {showConfirmPassword ? (
                     <img src="/images/main/variable/eyes/eyePress.png" width='35px' height='35px' alt="Show confirm password" />
                  ) : (
                     <img src="/images/main/variable/eyes/eye.svg" width='35px' height='35px' alt="Hide confirm password" />
                  )}
               </button>
            </div>
            {confirmPasswordError && <p className="text-xs text-red-600 mt-2">{confirmPasswordError}</p>}
         </div>
      </>
   );
};

export default PasswordField;
