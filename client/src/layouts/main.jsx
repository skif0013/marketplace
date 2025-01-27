import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";

const MainLayout = ({ children, main = '', body = '' }) => {
   return (
      <div className={`${body}`}>
         <Header />
         <main className={`${main}`}>
            {children}
         </main>
         <Footer />
      </div>
   );
};

export default MainLayout;