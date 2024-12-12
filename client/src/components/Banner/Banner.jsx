export default function Banner() {
   function scrollLeft() {
      const container = document.querySelector('.banner-collection');
      container.scrollBy({
         left: -container.offsetWidth, // Прокручиваем на ширину одного баннера
         behavior: 'smooth',
      });
   }

   function scrollRight() {
      const container = document.querySelector('.banner-collection');
      container.scrollBy({
         left: container.offsetWidth,
         behavior: 'smooth',
      });
   }

   return (
      <div className="relative banner-container">
         <button
            className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black text-white p-2 rounded"
            onClick={() => scrollLeft()}
         >
            ‹
         </button>
         <div className="banner-collection flex overflow-hidden">
            <div className="banner flex-shrink-0">1</div>
            <div className="banner flex-shrink-0">2</div>
            <div className="banner flex-shrink-0">3</div>
         </div>
         <button
            className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black text-white p-2 rounded"
            onClick={() => scrollRight()}
         >
            ›
         </button>
      </div>
   )
}