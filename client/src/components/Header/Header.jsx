import './Header.css'
import { Link, useNavigate } from "react-router-dom";
import { useModal } from "../../hooks/useModal";
import SearchForm from '../search/searchForm'
import LoginModal from '../Modal/LoginModal';
import { useEffect, useState } from 'react';
import { getUserData } from '../../services/auth/getDataUser';


export default function Header() {
   const { isModalOpen, modalType, openModal, closeModal } = useModal();
   const [addProduct, setAddProduct] = useState(false);
   const navigate = useNavigate();

   useEffect(() => {
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
         const userData = getUserData(accessToken);
         if (userData === 'admin') {
            setAddProduct(true);
         }else{
            console.log('Не admin');
            setAddProduct(false);
         }
      }
   }, []); // Пустой массив зависимостей гарантирует, что проверка произойдет только один раз при монтировании компонента.

   const handleClick = (event) => {
      if (localStorage.getItem('accessToken')) {
         navigate("/profile");
      } else {
         event.preventDefault();
         let register = confirm("Войдите в аккаунт");
         register ? openModal("register") : null;
      }
   };

   return (
      <>
         <header className="flex justify-between items-center bg-black p-6">
            <div className="logo">
               <h1 className="font-bold"><Link to='/'>Shopilyze</Link></h1>
            </div>
            <div className="header-tools flex items-center justify-between space-x-6">
               <div className="flex items-center gap-4">
                  {addProduct && (
                     <div className="admin__button">
                        <Link to={'/'}>Добавить объявление</Link>
                     </div>
                  )}
                  <SearchForm />
                  <select name="lang" className="select-lang">
                     <option value="RU">RU</option>
                     <option value="UA">UA</option>
                  </select>
               </div>
               <div className="header-navigation flex gap-6 pl-6">
                  <Link to="/profile" onClick={handleClick}>
                     <img
                        src="/images/main/human.svg"
                        width="40px"
                        height="auto"
                        alt="Profile"
                        onMouseEnter={(e) => e.target.src = "/images/main/variable/human/hover.svg"}
                        onMouseLeave={(e) => e.target.src = "/images/main/variable/human/main.svg"}
                     />
                  </Link>

                  <Link to="/api/basket" >
                     <img
                        src="/images/main/variable/basket/basket.svg"
                        width="40px"
                        height="auto"
                        alt="bassket"
                        onMouseEnter={(e) => e.target.src = "/images/main/variable/basket/hover.svg"}
                        onMouseLeave={(e) => e.target.src = "/images/main/variable/basket/basket.svg"}
                     />
                  </Link>

                  <Link to="/errors" onClick={handleClick}>
                     <img
                        src="/images/main/variable/heart/heart.svg"
                        width="40px"
                        height="auto"
                        alt="bassket"
                        onMouseEnter={(e) => e.target.src = "/images/main/variable/heart/hover.svg"}
                        onMouseLeave={(e) => e.target.src = "/images/main/variable/heart/heart.svg"}
                     />
                  </Link>
               </div>
               {modalType && <LoginModal isOpen={isModalOpen} onClose={closeModal} />}
            </div>
         </header>
      </>
   )
}
