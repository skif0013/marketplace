import React, { useEffect, useState } from 'react';
import getRoutes from './components/routes/routes';

/*Style */
import './style/App.css';
import './style/banner.css';
import './style/adaptive/pages/adaptive.css';

function App() {
   // Функция для сохранения токена в LocalStorage
   function saveToken(token) {
      localStorage.setItem("accessToken", token);
   }

   // Функция для получения токена из LocalStorage
   function getToken() {
      return localStorage.getItem("accessToken");
   }

   // Функция для обновления токена
   async function refreshToken() {
      try {
         const response = await fetch("https://www.apishka.somee.com/api/auth/refresh", {
            method: "GET",
            headers: {
               Accept: "*/*",
            },
         });

         if (!response.ok) {
            throw new Error(`Ошибка: ${response.status}`);
         }

         const data = await response.json();
         if (data.accessToken) {
            saveToken(data.accessToken);
            console.log("Токен обновлен:", data.accessToken);
         }
      } catch (error) {
         console.error("Не удалось обновить токен:", error);
      }
   }

   // Функция для проверки и обновления токена при необходимости
   async function checkToken() {
      const token = getToken();
      if (!token) {
         console.log("Токен отсутствует, обновляем...");
         await refreshToken();
         return;
      }

      // Проверяем, истёк ли токен (если используется JWT)
      const payload = JSON.parse(atob(token.split(".")[1])); // Декодирование payload из JWT
      const isExpired = payload.exp * 1000 < Date.now(); // Проверка истечения токена

      if (isExpired) {
         console.log("Токен истёк, обновляем...");
         await refreshToken();
      } else {
         console.log("Токен действителен");
      }
   }
   
   // Выполняем проверку токена при загрузке страницы
   document.addEventListener("DOMContentLoaded", checkToken);

   // Пример использования токена
   function useToken() {
      const token = getToken();
      if (token) {
         console.log("Ваш токен:", token);
         // Используйте токен для запросов
      } else {
         console.log("Токен отсутствует");
      }
   }


   return (
      <>
         {getRoutes()} {/* Основные маршруты */}
      </>
   );
}

export default App;