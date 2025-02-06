import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import categoriesWithImages from "../../utils/profileImages";
import "./Catalog.css";
import ClipLoader from "react-spinners/ClipLoader";

export default function CatalogProfile() {
   const [activeIndex, setActiveIndex] = useState(null);
   const [hoveredIndex, setHoveredIndex] = useState(null);
   const [catalogElements, setCatalogItems] = useState([]);
   const navigate = useNavigate();

   const goToProduct = (id) => navigate(`/api/product/productByCategory/${id}`);


   useEffect(() => {
      const fetchData = async () => {
         try {
               const CatalogData = categoriesWithImages.map(({ name, images }) => ({
                  name,
                  image: {
                     main: images[0],
                     hover: images[1],
                     press: images[2]
                  }
               }));
               setCatalogItems(CatalogData);
         } catch (error) {
            console.error("Ошибка загрузки каталога", error);
         }
      };
      fetchData();
   }, []);

   return (
      <article className="catalog p-6 w-1/4">
         <h3 className="font-bold text-2xl mb-6">Мой профиль</h3>
         <section className="catalog-items">
            {catalogElements.length > 0 ? (
               catalogElements.map((item, index) => (
                  <div
                     key={index}
                     className={`catalog-item ${activeIndex === index ? "active" : ""}`}
                     onClick={() => goToProduct(index)}
                     onMouseEnter={() => setHoveredIndex(index)}
                     onMouseLeave={() => setHoveredIndex(null)}
                  >
                     <div className={`catalog__section relative ${activeIndex === index ? "active" : ""} pb-6`}>
                        <img
                           src={hoveredIndex === index ? item.image.hover : activeIndex === index ? item.image.press : item.image.main}
                           alt='Картинка'
                           width="35px"
                           height="35px"
                        />
                        <span>{item.name}</span>
                        <img
                           src={hoveredIndex === index ? "/images/main/variable/arrow/Arrow_right-hover.svg" : activeIndex === index ? "/images/main/variable/arrow/press.png" : "/images/main/variable/arrow/arrow_right.svg"}
                           className="arrow absolute top-0 right-0"
                           alt="arrow"
                        />
                     </div>
                  </div>
               ))
            ) : (
               <div className="flex justify-center items-center">
                  <ClipLoader color="#FFA500" size={50} />
               </div>
            )}
         </section>
      </article>
   );
}