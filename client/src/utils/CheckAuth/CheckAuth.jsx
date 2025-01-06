import React, { useState, useEffect } from "react";
import LoginModal from "../../components/Modal/LoginModal";
import RegistrationModal from "../../components/Modal/RegistrationModal";
import CommentModal from "../../components/Modal/CommentModal";

export const OpenModal = ({ triggerModal, defaultModalType = "", confirm = '' }) => {
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [modalType, setModalType] = useState(defaultModalType);

   const openModal = (type) => {
      useEffect(() => {
         if (localStorage.getItem("accessToken")) {
            setModalType(type || "comment");
         } else {
            confirm ? (
               () => {
                  let confirmation = confirm(confirm);
                  if (confirmation) {
                     setModalType("register")
                  }
               }
            ) : ('')
         }
         return setIsModalOpen(true);
      })
   };

   const closeModal = () => {
      setIsModalOpen(false);
      setModalType("");
   };

   useEffect(() => {
      if (triggerModal) {
         openModal(defaultModalType);
      }
   }, [triggerModal, defaultModalType]);

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
   return renderModal();
};