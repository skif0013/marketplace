import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginModal from "../Modal/LoginModal";
import RegistrationModal from "../Modal/RegistrationModal";
import CommentModal from "../Modal/CommentModal";

import { useModal } from "../../hooks/useModal";


export const HeaderNavigation = () => {
   const { isModalOpen, modalType, openModal, closeModal } = useModal();
   const navigate = useNavigate();

   const handleClick = (event) => {
      if (localStorage.getItem("AuthRefreshToken")) {
         navigate("/profile");
      } else {
         event.preventDefault();
         openModal("register");
         alert("Вы должны войти в систему перед переходом на профиль!");
      }
   };

   return (
      <>
         <div className="header-navigation flex gap-6">
            <Link href="/profile" onClick={handleClick}>
               <img src="/images/main/human.svg" width="36px" height="auto" alt="" />
            </Link>
            <Link href="/api/basket">
               <img src="/images/main/variable/basket/basket.svg" width="36px" height="auto" alt="basket" />
            </Link>
            <Link href="/" onClick={handleClick}>
               <img src="/images/main/variable/heart/heart.svg" width="36px" height="auto" alt="like button" />
            </Link>
         </div>
         {modalType === "register" && <RegistrationModal isOpen={isModalOpen} onClose={closeModal} />}
      </>
   );
};


export const OpenModal = ({ triggerModal, defaultModalType = "" }) => {
   const [isModalOpen, setIsModalOpen] = useState(false); // Состояние для модального окна
   const [modalType, setModalType] = useState(defaultModalType); // Тип модального окна

   // Функция для открытия модального окна
   const openModal = (type) => {
      if (localStorage.getItem("AuthRefreshToken")) {
         setModalType(type || "comment");
      } else {
         setModalType("register");
         alert("Вы не зарегистрированы. Пожалуйста, зарегистрируйтесь или войдите.");
      }
      setIsModalOpen(true);
   };

   // Функция для закрытия модального окна
   const closeModal = () => {
      setIsModalOpen(false);
      setModalType("");
   };

   // Открытие модального окна при изменении triggerModal
   useEffect(() => {
      if (triggerModal) {
         openModal(defaultModalType);
      }
   }, [triggerModal, defaultModalType]); // Следим за изменением triggerModal или defaultModalType

   // Выбор модального компонента на основе типа
   const renderModal = () => {
      switch (modalType) {
         case "comment":
            return <CommentModal isOpen={isModalOpen} onClose={closeModal} />;
         case "register":
            return <RegistrationModal isOpen={isModalOpen} onClose={closeModal} />;
         case "login":
            return <LoginModal isOpen={isModalOpen} onClose={closeModal} />;
         default:
            return null;
      }
   };

   return <>{renderModal()}</>;
};