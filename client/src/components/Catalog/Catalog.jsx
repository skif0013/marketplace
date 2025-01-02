import React, { useState } from 'react';
import './Catalog.css';
import {Link} from "react-router-dom";
import Sell from "../../Pages/Sell/Sell.jsx";

export default function Catalog() {
   const [activeIndex, setActiveIndex] = useState(null);
   const [hoveredIndex, setHoveredIndex] = useState(null);

   const toggleAccordion = (index) => {
      setActiveIndex(activeIndex === index ? null : index);
   };

   const handleMouseEnter = (index) => {
      setHoveredIndex(index);
   };

   const handleMouseLeave = () => {
      setHoveredIndex(null);
   };

   const catalogItems = [
      {
         title: 'Компьютеры и ноутбуки',
         img: {
            main: '/images/main/variable/laptop/main_laptop.svg',
            press: '/images/main/variable/laptop/press_laptop.svg',
            hover: '/images/main/variable/laptop/hover_laptop.svg'
         },
         details: [
            'Чиназес 1',
            'Дайте хлеба',
            'Солдатами не рождаются, солдатами умирают',
            'Да я знаю что это должно быть ссылки, но не всё сразу'
         ]
      },
      {
         title: 'Комплектующие',
         img: {
            main: '/images/main/variable/switch/switch_main.svg',
            press: '/images/main/variable/switch/press.svg',
            hover: '/images/main/variable/switch/switch_hover.svg'
         },
         details: [
            'Чё за нах',
            'Фантазия кончаеться',
            'Это есть ссылка',
            'Заебался'
         ]
      },
      {
         title: 'Сетевое оборудование',
         img: {
            main: '/images/main/variable/route/main.svg',
            press: '/images/main/variable/route/press.svg',
            hover: '/images/main/variable/route/hover.svg'
         },
         details: [
            'Чё за нах',
            'Фантазия кончаеться',
            'Это есть ссылка',
            'Заебался'
         ]
      },
      {
         title: 'Наушники и Аксессуары',
         img: {
            main: '/images/main/variable/headphone/default.svg',
            press: '/images/main/variable/headphone/press.svg',
            hover: '/images/main/variable/headphone/hover.svg'
         },
         details: [
            'Чё за нах',
            'Фантазия кончаеться',
            'Это есть ссылка',
            'Заебался'
         ]
      },
      {
         title: 'Клавиатуры и Мыши',
         img: {
            main: '/images/main/variable/mause/main.svg',
            press: '/images/main/variable/mause/press.svg',
            hover: '/images/main/variable/mause/hover.svg'
         },
         details: [
            'Чё за нах',
            'Фантазия кончаеться',
            'Это есть ссылка',
            'Заебался'
         ]
      },
   ];

   return (
      <article className="catalog">
         <h3 className="font-bold text-2xl mb-6">Каталог</h3>
         <section className="catalog-items">
            {catalogItems.map((item, index) => (
               <div
                  key={index}
                  className={`catalog-item ${activeIndex === index ? 'active' : ''}`}
               >
                  <div
                     onClick={() => toggleAccordion(index)}
                     onMouseEnter={() => handleMouseEnter(index)}
                     onMouseLeave={handleMouseLeave}
                     className={`catalog__section relative ${activeIndex === index ? 'active' : ''} pb-6`}
                  >
                     <img
                        src={hoveredIndex === index ? item.img.hover : (activeIndex === index ? item.img.press : item.img.main)}
                        alt={item.title}
                     />
                     <span>{item.title}</span>
                     <img
                        src={
                           hoveredIndex === index
                              ? '/images/main/variable/arrow/hover.png'
                              : (activeIndex === index ? '/images/main/variable/arrow/press.png' : '/images/main/variable/arrow/arrow_right.svg')
                        }
                        className={`arrow absolute top-0 right-0`}
                        alt="arrow"
                     />
                  </div>
                  {activeIndex === index && item.details.length > 0 && (
                     <div className="catalog-details">
                        {item.details.map((detail, detailIndex) => (
                           <p className="py-2" key={detailIndex}>{detail}</p>
                        ))}
                     </div>
                  )}
               </div>
            ))}
         </section>

         <h3 className="font-bold text-xl mb-4">Партнерам</h3>
         <section className="catalog-items">
            <Link to='/sell' className="catalog__section relative">
               <img src="/images/main/sell.svg" alt="Продавать на Shopilyze" />
               <span>Продавать на Shopilyze</span>
               <img
                  src="/images/main/variable/arrow/arrow_right.svg"
                  className="absolute top-0 right-0"
                  alt="arrow right"
               />
            </Link>
         </section>

         <h3 className="font-bold text-xl mb-4">Продавцам</h3>
         <section className="catalog-items">
            <a href="#" className="catalog__section relative">
               <img src="/images/main/chat.svg" alt="Чат с продавцами" />
               <span>Чат с продавцами</span>
               <img
                  src="/images/main/variable/arrow/arrow_right.svg"
                  className="absolute top-0 right-0"
                  alt="arrow right"
               />
            </a>
         </section>
      </article>
   );
}