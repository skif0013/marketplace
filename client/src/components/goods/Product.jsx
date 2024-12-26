import { Link } from "react-router-dom";
import { OpenModal } from "../CheckAuth/CheckAuth";
import { useState } from "react";

export default function Product({ id, pictureUrl, price, title }) {
   //Для работы с модальным окном
   const [triggerModal, setTriggerModal] = useState(false);
   const handleOpenModal = () => {
      setTriggerModal(true);
   };

   return (
      <div className="product_item bg-orange-50 p-4 max-w-xs mx-auto">
         <div className="mb-4 ">
            <Link to={`/api/product/${id}`}>
               <img draggable={"false"} src={pictureUrl} className="w-[160px] h-[160px] rounded" alt={title} />
            </Link>
         </div>
         <span className="product_item-title">
            <Link to={`/api/product/${id}`}>{title}</Link>
         </span>
         <div className="flex justify-between mt-6">
            <span className="product_item-price">{price}</span>
            <a href="#">
               <img draggable={"false"} src="/images/main/variable/basket/BasketMain.svg" className="text-black" width="32px" height="32px" alt="basket" />
            </a>
         </div>
         <a href="#" onClick={handleOpenModal} className="product_item-heart">
            <img draggable={"false"} src="/images/main/variable/heart/heart.svg" alt="heart" />
         </a>
         <OpenModal triggerModal={triggerModal} />
      </div>
   );
}