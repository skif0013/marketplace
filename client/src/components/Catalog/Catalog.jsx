import './Catalog.css';


export default function Catalog() {
   return (
      <article className="catalog">
         <h3 className="font-bold text-2xl mb-6">Каталог</h3>
         <section className="catalog-items">
            <a href="#" className="catalog__section relative">
               <img src="/images/main/laptop.svg" alt="Компьютеры и ноутбуки" />
               <span>Компьютеры и ноутбуки</span>
               <img
                  src="/images/main/arrow_right.svg"
                  className="absolute top-0 right-0"
                  alt="arrow right"
               />
            </a>
            <a href="#" className="catalog__section relative">
               <img src="/images/main/switch.svg" alt="Комплектующие" />
               <span>Комплектующие</span>
               <img
                  src="/images/main/arrow_right.svg"
                  className="absolute top-0 right-0"
                  alt="arrow right"
               />
            </a>
            <a href="#" className="catalog__section relative">
               <img src="/images/main/router.svg" alt="Сетевое оборудование" />
               <span>Сетевое оборудование</span>
               <img
                  src="/images/main/arrow_right.svg"
                  className="absolute top-0 right-0"
                  alt="arrow right"
               />
            </a>
            <a href="#" className="catalog__section relative">
               <img src="/images/main/headphone.svg" alt="Наушники и аксессуары" />
               <span>Наушники и аксессуары</span>
               <img
                  src="/images/main/arrow_right.svg"
                  className="absolute top-0 right-0"
                  alt="arrow right"
               />
            </a>
            <a href="#" className="catalog__section relative">
               <img src="/images/main/mouse.svg" alt="Клавиатуры и мыши" />
               <span>Клавиатуры и мыши</span>
               <img
                  src="/images/main/arrow_right.svg"
                  className="absolute top-0 right-0"
                  alt="arrow right"
               />
            </a>
         </section>

         <h3 className="font-bold text-xl mb-4">Партнерам</h3>
         <section className="catalog-items">
            <a href="#" className="catalog__section relative">
               <img src="/images/main/sell.svg" alt="Продавать на Shopilyze" />
               <span>Продавать на Shopilyze</span>
               <img
                  src="/images/main/arrow_right.svg"
                  className="absolute top-0 right-0"
                  alt="arrow right"
               />
            </a>
         </section>

         <h3 className="font-bold text-xl mb-4">Продавцам</h3>
         <section className="catalog-items">
            <a href="#" className="catalog__section relative">
               <img src="/images/main/chat.svg" alt="Чат с продавцами" />
               <span>Чат с продавцами</span>
               <img
                  src="/images/main/arrow_right.svg"
                  className="absolute top-0 right-0"
                  alt="arrow right"
               />
            </a>
         </section>
      </article>
   )
}