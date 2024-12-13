import Header from "../components/Header/Header"
import Footer from "../components/Footer/Footer"
import Feedback from "../components/feedback/feedback";
import { ButtonProduct } from "../components/buttons/button";
import Specifications from '../components/Specifications/Specifications';
import WhiteButton from "../components/buttons/WhiteButton/WhiteButton";
import Triarty from "../components/buttons/Triarty/Triarty";
/* Вспывающие окна */
import CommentModal from "../components/Modal/CommentModal";
import RegistrationModal from "../components/Modal/RegistrationModal";
import Login from "../components/Modal/Login";

import ClipLoader from "react-spinners/ClipLoader";
import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import axios from "axios";


export default function Product() {
   //Получение одного товара из API
   const { id } = useParams(); // Получение id из роутов
   const [product, setProduct] = useState(null);

   useEffect(() => {
      axios.get(`https://www.apishka.somee.com/api/product/${id}`)
         .then((response) => {
            console.log(response.data);
            setProduct(response.data);
         })
         .catch((error) => {
            console.error(error);
            
         });
   }, [id]);

   //вставка звёзд
   const
      starFill = '/images/goods/star-fill.png',
      starTransparency = '/images/goods/star-transparency.png',
      renderStars = () => {
         // Генерация случайного количества звезд
         const fullStars = product.grade; //Получения количество звёзд
         const stars = [];
         for (let i = 1; i <= 5; i++) {
            stars.push(
               <img
                  key={i}
                  src={i <= fullStars ? starFill : starTransparency}
                  alt="star"
                  className="w-5 h-5"
               />
            );
         }
         return stars;
      };

   //Водные данные для характеристики
   const specificationsData = [
      {
         title: "Экран",
         items: [
            { name: "Диагональ экрана", value: "16.2" },
            { name: "Частота обнавления экрана", value: "120 Гц" },
            { name: "Тип экрана", value: "Liquid Retina XDR" },
            { name: "Разрешение", value: "3456х2234" },
            { name: "Покрытие экрана", value: "Глянцевое" },
            { name: "Встроенная камера", value: "FaceTime HD 1080p" },
         ],
      },
      {
         title: "Процессор",
         items: [
            { name: "Процессор", value: "Двенадцатиядерный Apple M3 Pro" },
            { name: "Операционная система", value: "macOS Sonoma" },
         ],
      },
      {
         title: "Оперативная память",
         items: [{ name: "Объем оперативной памяти", value: "16 ГБ" }],
      },
      {
         title: "Накопители данных",
         items: [
            { name: "Объём SSD", value: "512 ГБ" },
            { name: "Тип накопителя", value: "SSD" },
            { name: "Количество слотов M.2", value: "Без слота M.2" },
         ],
      },
      {
         title: "Видеокарта",
         items: [
            { name: "Производитель видеокарты", value: "Apple" },
            { name: "Тип видеокарты", value: "Встроенная" },
         ],
      },
   ];

   //Скрол
   let
      specificationsRef = useRef(false),
      feedbackRef = useRef(false);
   const scrollToSection = (ref) => ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });

   //Modal
   const isAuthenticated = Math.random() < 0.5; // Генерирует true или false случайно
   const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
   const openCommentModal = () => setIsCommentModalOpen(true); // Открыть модальное окно
   const closeCommentModal = () => setIsCommentModalOpen(false); // Закрыть модальное окно

   return (
      <div className="flex flex-col min-h-screen">
         <Header />
         <main className="flex-grow">
            <div className="pl-10 pt-10">
               <article className="mb-6 flex gap-2 items-center">
                  <section><img src="/images/main/variable/house/HouseDefault.svg" alt="" /></section>
                  <section>/Apple</section>
                  <section>/Название</section>
               </article>
               {
                  product ? (
                     <div className="grid grid-cols-2 items-stretch mb-32">
                        {/* Заголовок товара */}
                        <section>
                           {product ? (<h1 className={styles.productName}>{product.title.ru}</h1>) : (<p>загрузка</p>)}
                        </section>

                        {/* Кнопки: просмотр товара и характеристики */}
                        <div>
                           <Triarty
                              specificationsRef={specificationsRef}
                              feedbackRef={feedbackRef}
                              totalReviews={product.comments.length}
                              scrollToSection={scrollToSection}
                           />
                        </div>

                        {/* Product images */}
                        <section className="bg-orange-100 p-6 mt-10"><img className="w-[550px] h-[370px]" src={product.pictureUrl} alt="images" /></section>

                        {/* Product info */}
                        <section className="bg-orange-100 p-6 mt-10 flex flex-col gap-14">
                           <div className={styles.ProductFullTitle}>{product.title.ru}</div>
                           <section className="flex items-center">
                              <section className="flex gap-4 mr-6">{renderStars()}</section>
                              <div className={styles.ProductAvailability}>  В наличии</div>
                           </section>
                           <section className={styles.productInfo}>
                              <div className="mb-4">Имя продавца: {product.seller}</div>
                              <div>Код товара:  {product.productCode}</div>
                           </section>
                           <section className="flex gap-6 items-center relative">
                              <div className={styles.ProductPrice}>{product.price}</div>
                              <ButtonProduct name={'Купить'} />
                              <WhiteButton className='p-2'>
                                 <img src="/images/main/variable/heart/heartMain.svg" alt="heart" />
                              </WhiteButton>
                           </section>
                        </section>
                     </div>
                  ) : (
                     // Загрузка, для того чтобы успели подгрузиться информация
                     <div className="flex justify-center items-center h-full">
                        <ClipLoader color="#FFA500" size={60} />
                     </div>
                  )
               }
               {/* Характеристики */}
               <Specifications ref={specificationsRef} data={specificationsData} />
               <section className="mb-10 mt-10 flex items-center gap-10" ref={feedbackRef}>
                  <h1 className="text-4xl font-bold">Отзывы</h1>
                  <button className="text-gray-500" onClick={openCommentModal}>Оставить отзыв</button>
               </section>

               {/* Modal comment */}
               {/* <RegistrationModal isOpen={isCommentModalOpen} onClose={closeCommentModal} /> */}

               {isAuthenticated ? (
                  <Login isOpen={isCommentModalOpen} onClose={closeCommentModal} />
               ) : (
                  <CommentModal isOpen={isCommentModalOpen} onClose={closeCommentModal} />
               )}

               {product ? (
                  product.comments ? (
                     <Feedback name={'Владимир Foresto-ВІЧ'} text={'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus, tempore. Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus, tempore. '} date={'02.07.2004'} />
                  ) : (
                     <p className="mb-12">- Нету тут коментариев</p>
                  )
               ) : (
                  // Загрузка, для того чтобы успели подгрузиться информация
                  <div className="flex justify-center items-center h-full mb-20">
                     <ClipLoader color="#FFA500" size={60} />
                  </div>
               )}
            </div>
         </main >
         <Footer />
      </div >
   )
}