import { Link } from "react-router-dom"
import { ButtonMain } from '../buttons/button'

export function Error404() {
   return (
      <>
         <div className="basket">
            <div className="flex gap-16">
               <img src="/images/errors/4.png" draggable="false" alt="Errors" />
               <img src="/images/errors/0.png" draggable="false" alt="Errors" />
               <img src="/images/errors/4.png" draggable="false" alt="Errors" />
            </div>
            <h1 className="text-4xl mt-16">Страница не найдена</h1>
            <Link to='/'><ButtonMain name='Продолжить покупки' /></Link>
         </div>
      </>
   )
}

export function Error500() {
   return (
      <>
         <div className="basket">
            <div className="flex gap-16">
               <img src="/images/errors/5.png" draggable="false" alt="Errors" />
               <img src="/images/errors/0.png" draggable="false" alt="Errors" />
               <img src="/images/errors/0.png" draggable="false" alt="Errors" />
            </div>
            <h1 className="text-4xl mt-16">Ошибка сервера</h1>
            <Link to='/'><ButtonMain name='Продолжить покупки' /></Link>
         </div>
      </>
   )
}