
// Random star generation
const starFill = '/images/goods/star-fill.png';
const starTransparency = '/images/goods/star-transparency.png';
const RenderStars = () => {
   // Generate a random number of "filled" stars (2/3)
   const fullStars = Math.floor(Math.random() * 4);
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

export default RenderStars;