import axios from 'axios';

const API_URL = 'https://marketplace-800v.onrender.com/api/product';

export const getProductById = async (id) => {
   try {
      const response = await axios.get(`${API_URL}/${id}`);
      console.log(response.data);
      
      return response.data; // Возвращаем данные
   } catch (err) {
      console.log(err);
   }
};