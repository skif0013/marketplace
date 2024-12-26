import { useState } from "react";

export const useModal = () => {
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [modalType, setModalType] = useState("");

   // Функция для открытия модального окна
   const openModal = (type) => {
      setModalType(type);
      setIsModalOpen(true);
   };

   // Функция для закрытия модального окна
   const closeModal = () => {
      setIsModalOpen(false);
      setModalType("");
   };

   return { isModalOpen, modalType, openModal, closeModal };
};
