import axios from "axios";

const catalog = 'https://marketplace-800v.onrender.com/api/Products/categories';

export const MainCatalog = async () => {
   try {
      const response = await axios.get(catalog, {
         headers: {
            "Accept": "*/*",
            "Content-Type": "application/json"
         },
      });
      return response.data;
   } catch (error) {
      console.error("Ошибка загрузки каталога:", error);
   }
};