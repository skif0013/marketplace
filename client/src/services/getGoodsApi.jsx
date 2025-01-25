import axios from 'axios';

const API_URL = 'https://marketplace-800v.onrender.com/api/Products';

export const getGoodsApi = async () => {
   try {
      const response = await axios.get(API_URL, {
         params: {
            _order: 'asc',
            _start: 0,
            _end: 100,
         },
         headers: {
            accept: '*/*',
         },
      });
      return response.data; // Возвращаем данные
   } catch (err) {
      console.log(err);
   }
};