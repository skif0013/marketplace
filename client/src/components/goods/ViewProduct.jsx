import Title from '../Title';
import ClipLoader from "react-spinners/ClipLoader";
import Product from '../goods/Product';

export default function ViewProduct({ products, text, link, buttonRight }) {
   //Добавление товаров
   const getRandomProducts = (products, count) => {
      const shuffled = [...products].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
   };

   const randomFourGoods = products ? getRandomProducts(products, 4) : [];
   return (
      <>
         <Title text={text} link={link} buttonRight={buttonRight} target='_blank' />
         <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 mb-12" style={{ overflow: 'hidden' }}>
            {products && products.length > 0 ? (
               randomFourGoods.map((product) => (
                  <Product
                     key={product.id}
                     id={product.id}
                     pictureUrl={product.pictureUrl}
                     price={product.price}
                     title={product.title.ru}
                  />
               ))
            ) : (
               <div className="flex justify-center items-center">
                  <ClipLoader color="#FFA500" size={60} />{/* Загрузка */}
               </div>
            )}
         </section>
      </>
   );
}