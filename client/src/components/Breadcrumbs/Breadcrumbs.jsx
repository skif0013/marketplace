import React from "react";
import { Link } from "react-router-dom";

const Breadcrumbs = ({ parentCategory, subCategory, productId, productName }) => {
   const home = "Home";

   return (
      <article className="mb-6 flex gap-4 items-center">
         <section>
            <Link to="/">
               <img
                  src="/images/main/variable/house/HouseDefault.svg"
                  alt="Home"
                  className="w-8 h-8"
               />
            </Link>
         </section>
         <span>/</span>
         <section>
            <Link to={`/api/product/category`} className="text-gray-600 text-lg">
               {parentCategory}
            </Link>
         </section>
         <span>/</span>
         <section>
            <Link to={`/api/product/productByCategory/${subCategory}`} className="text-gray-600 text-lg">
               {subCategory}
            </Link>
         </section>
         <span>/</span>
         <section>
            <Link to={`/api/product/${productId}`} className="text-gray-600 font-bold text-lg">
               {productName}
            </Link>
         </section>
      </article>
   );
};

export default Breadcrumbs;
