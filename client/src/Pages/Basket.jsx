import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import { BasketEmpty, BasketMain } from "../components/Basket/Basket";

export default function Basket() {
   let basket = ['d'];
   return (
      <div className={`flex flex-col min-h-screen ${basket && basket.length === 0 ? 'bg-orange-100' : ''}`}>
         <Header />
         <main className="flex-grow mb-52 mt-20">
            {basket && basket.length === 0 ? (
               <BasketEmpty />
            ) : (
               <BasketMain />
            )}
         </main>
         <Footer />
      </div>

   )
}