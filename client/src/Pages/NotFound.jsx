import { Error404, Error500 } from "../components/Error/Error";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";



export default function NotFound() {

   return (
      <div className="flex flex-col min-h-screen">
         <Header />
         <main className="flex-grow mb-56 mt-60">
            <Error404/>
         </main>
         <Footer />
      </div>
   )
}