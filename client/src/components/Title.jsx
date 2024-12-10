const Title = ({ text, link, buttonRight}) => {
   return (      
      <a href={link} className="relative">
         <h2 className="font-bold text-3xl mt-12 mb-4">{text}</h2>
         <div className="absolute top-0" style={{ left: buttonRight }}>
            <img src="images/main/arrow_right.svg" alt="" />
         </div>
      </a>
   );
};
export default Title;
