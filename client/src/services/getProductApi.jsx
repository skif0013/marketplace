import axios from 'axios';

const API_URL = 'https://marketplace-800v.onrender.com/api/Products';

export const getProductById = async (id) => {
   try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
   } catch (err) {
      console.log(err);
   }
};