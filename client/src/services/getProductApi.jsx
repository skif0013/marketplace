import axios from 'axios';

const API_URL = 'https://www.apishka.somee.com/api/product';

export const getProductById = async (id) => {
   try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data; // Возвращаем данные
   } catch (err) {
      throw new Error(err.message); // Бросаем ошибку
   }
};
