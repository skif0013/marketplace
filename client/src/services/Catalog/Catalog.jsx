import axios from "axios";

const catalog = 'https://marketplace-800v.onrender.com/api/product/category';

export const CatalogParentCategory = async () => {
   try {
      const response = await axios.get(catalog, {
         headers: {
            "Accept": "*/*",
            "Content-Type": "application/json"
         },
      });
      console.log(response.data); // Выводим данные, а не промис
   } catch (error) {
      console.error("Ошибка загрузки каталога:", error);
   }
};