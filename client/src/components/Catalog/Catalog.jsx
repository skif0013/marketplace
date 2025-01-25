import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MainCatalog } from '../../services/Catalog/catalog';
import catalogImages from '../../utils/catalogImages';
import './Catalog.css';

export default function Catalog() {
   const [activeIndex, setActiveIndex] = useState(null);
   const [hoveredIndex, setHoveredIndex] = useState(null);
   const [catalogElements, setCatalogItems] = useState([]);
   const catalogImagesName = [catalogImages.laptop, catalogImages.switch, catalogImages.route, catalogImages.headphone, catalogImages.mouse];
   const navigate = useNavigate();

   //Навигация по каталогу
   const goToProduct = (id) => navigate(`/api/product/productByCategory/${id}`);

   // Получаем данные каталога по API
   useEffect(() => {
      const fetchData = async () => {
         try {
            const data = await MainCatalog();
            if (data) {
               const CatalogData = data.map((category, index) => ({
                  ...category,
                  image: catalogImagesName[index % catalogImagesName.length] // Зацикливаем, если изображений меньше
               }));
               return setCatalogItems(CatalogData);
            }
         } catch (error) {
            console.error('Ошибка загрузки каталога', error);
         }
      };

      fetchData();
   }, []);


   const toggleAccordion = (index) => {
      setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
   };

   const handleMouseEnter = (index) => {
      setHoveredIndex(index);
   };

   const handleMouseLeave = () => {
      setHoveredIndex(null);
   };


   return (
      <article className="catalog">
         <h3 className="font-bold text-2xl mb-6">Каталог</h3>
         <section className="catalog-items">
            {catalogElements.map((item, index) => (
               <div key={index} className={`catalog-item ${activeIndex === index ? "active" : ""}`}>
                  <div
                     onClick={() => toggleAccordion(index)}
                     onMouseEnter={() => handleMouseEnter(index)}
                     onMouseLeave={handleMouseLeave}
                     className={`catalog__section relative ${activeIndex === index ? "active" : ""} pb-6`}
                  >
                     <img
                        src={
                           hoveredIndex === index
                              ? item.image.hover
                              : activeIndex === index
                                 ? item.image.press
                                 : item.image.main
                        }
                        alt={item.name}
                     />
                     <span>{item.name}</span>
                     <img
                        src={
                           hoveredIndex === index
                              ? "/images/main/variable/arrow/hover.png"
                              : activeIndex === index
                                 ? "/images/main/variable/arrow/press.png"
                                 : "/images/main/variable/arrow/arrow_right.svg"
                        }
                        className="arrow absolute top-0 right-0"
                        alt="arrow"
                     />
                  </div>
                  {activeIndex === index && Array.isArray(item.subCategories) && item.subCategories.length > 0 && (
                     <div className="catalog-details">
                        {item.subCategories.map((detail, detailIndex) => (
                           <a onClick={() => goToProduct(detail.id)} className="catalog-details__link" key={detailIndex}>
                              {detail.nameCategory}
                           </a>
                        ))}
                     </div>
                  )}
               </div>
            ))}
         </section>

         <h3 className="font-bold text-xl mb-4">Партнерам</h3>
         <section className="catalog-items">
            <a href="#" className="catalog__section relative">
               <img src="/images/main/sell.svg" alt="Продавать на Shopilyze" />
               <span>Продавать на Shopilyze</span>
               <img
                  src="/images/main/variable/arrow/arrow_right.svg"
                  className="absolute top-0 right-0"
                  alt="arrow right"
               />
            </a>
         </section>

         <h3 className="font-bold text-xl mb-4">Продавцам</h3>
         <section className="catalog-items">
            <a href="#" className="catalog__section relative">
               <img src="/images/main/chat.svg" alt="Чат с продавцами" />
               <span>Чат с продавцами</span>
               <img
                  src="/images/main/variable/arrow/arrow_right.svg"
                  className="absolute top-0 right-0"
                  alt="arrow right"
               />
            </a>
         </section>
      </article>
   );
}