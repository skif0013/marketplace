// Feedback.jsx
import './feedback.css';
import { formatDate } from '../../utils/FormateDate';
import RenderStars from '../Stars/RenderStar';

const Feedback = ({ name, date, text }) => {
   // Format the date using the utility function
   const formattedDate = formatDate(date);

   return (
      <div className="p-10 bg-orange-100 mb-6">
         <div className="flex gap-6 mb-4 items-center justify-between">
            <div className="flex gap-6 items-center">
               <span className="feedback-name">{name}</span>
               <section className="flex gap-2">{RenderStars()}</section>
            </div>
            <div className="feedback-date">{formattedDate}</div>
         </div>
         <p className="feedback-text">{text}</p>
      </div>
   );
};

export default Feedback;
