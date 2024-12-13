import './feedback.css'


const Feedback = ({ name, date, text}) => {
   //Рандомная вставка звезд
   const
      starFill = '/images/goods/star-fill.png',
      starTransparency = '/images/goods/star-transparency.png',
      renderStars = () => {
         // Генерация случайного количества "полных" звезд (2/3)
         const fullStars = Math.floor(Math.random()*4)
         const stars = [];
         for (let i = 1; i <= 5; i++) {
            stars.push(
               <img
                  key={i}
                  src={i <= fullStars ? starFill : starTransparency}
                  alt="star"
                  className="w-4 h-4"
               />
            );
         }
         return stars;
      };

   return (
      <div className="p-10 bg-orange-100 mb-6">
         <div className="flex gap-6 mb-4 items-center justify-between">
            <div className="flex gap-6 items-center">
               <span className="feedback-name">{name}</span>
               <section className="flex gap-2">{renderStars()}</section>
            </div>
            <div className='feedback-date'>{date}</div>
         </div>
         <p className="feedback-text">{text}</p>
      </div>
   );
};

export default Feedback;
