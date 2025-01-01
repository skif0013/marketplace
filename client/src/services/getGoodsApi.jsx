import axios from 'axios';

const API_URL = 'https://www.apishka.somee.com/api/product';

export const getGoodsApi = async (params = {}) => {
   try {
      const response = await axios.get(API_URL, {
         params: {
            _order: 'asc',
            _start: 0,
            _end: 100,
            ...params, // Позволяет переопределить параметры при вызове функции
         },
         headers: {
            accept: '*/*',
         },
      });
      return response.data; // Возвращаем данные
   } catch (err) {
      throw new Error(err.message); // Бросаем ошибку для обработки в компонентах
   }
};
