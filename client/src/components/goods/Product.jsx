import { Link, useNavigate } from "react-router-dom";
import { useModal } from "../../hooks/useModal";
import LoginModal from '../Modal/LoginModal';

export default function Product({ id, pictureUrl, price, title }) {
   const { isModalOpen, modalType, openModal, closeModal } = useModal();
   const navigate = useNavigate();

   const handleClick = (event) => {
      if (localStorage.getItem('accessToken')) {
         navigate("/api/basket");
      } else {
         event.preventDefault();
         let register = confirm("Вы не зарегистрированы! Хотите зарегистрироваться?");
         register ? openModal("register") : null;
      }
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
         <a href="#" onClick={handleClick} className="product_item-heart">
            <img draggable={"false"} src="/images/main/variable/heart/heart.svg" alt="heart" />
         </a>
         {modalType && <LoginModal isOpen={isModalOpen} onClose={closeModal} />}
      </div>
   );
}