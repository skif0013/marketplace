import { Link } from "react-router-dom";

export default function Product({ id }) {
   return (
      <div className="product_item bg-orange-50 p-4 max-w-xs mx-auto">
         <div className="mb-4">
            <Link to={`/api/product/${id}`}>
               <img src="/images/goods/iphone.jpeg" className="w-full h-auto rounded" alt="iphone" />
            </Link>
         </div>
         <span className="product_item-title">
            <Link to={`/api/product/${id}`}>Iphone 15 Pro 1TB dasdasdasd</Link>
         </span>
         <div className="flex justify-between mt-6">
            <span className="product_item-price">56,099</span>
            <a href="#">
               <img src="images/main/variable/basket/BasketMain.svg" className="text-black" width="32px" height="32px" alt="basket" />
            </a>
         </div>
         <a href="#" className="product_item-heart">
            <img src="images/main/variable/heart/heart.svg" alt="heart" />
         </a>
      </div>
   );
}