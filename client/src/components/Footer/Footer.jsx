import { Link } from 'react-router-dom'
import './Footer.css'


export default function Footer() {

   return (
      <>
         <footer className="footer">
            <div className="footer-top">
               <section className="logo">
                  <h1 className="font-bold"><Link to='/'>Shopilyze</Link></h1>
               </section>
               <section>
                  <h6>Страницы</h6>
                  <ul>
                     <li><a href="#">Компютеры и Аксессуары</a></li>
                     <li><a href="#">Комплектующие</a></li>
                     <li><a href="#">Сетевое оборудование</a></li>
                     <li><a href="#">Наушники</a></li>
                     <li><a href="#">Клавиатуры и Мишы</a></li>
                  </ul>
               </section>
               <section>
                  <h6>Помощь</h6>
                  <ul>
                     <li><a href="#">F.A.Q</a></li>
                     <li><a href="#">Помощь</a></li>
                     <li><a href="#">Статусы</a></li>
                  </ul>
               </section>
               <section>
                  <h6>Компания</h6>
                  <ul>
                     <li><a href="#">Про компанию</a></li>
                  </ul>
               </section>
               <section>
                  <h6>Документация</h6>
                  <ul>
                     <li><a href="#">Cookies</a></li>
                     <li><a href="#">Privacy & Policy</a></li>
                  </ul>
               </section>
            </div>
            <div className="flex items-center justify-center border-t border-white py-6">
               <p className="font-semibold text-sm">2024 copyright shopilyze. Все права защищены</p>
            </div>
         </footer>
      </>
   )
}