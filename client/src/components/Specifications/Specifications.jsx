import React from "react";
import './Specifications.css';

const Specifications = React.forwardRef(({ data }, ref) => {
   return (
      <div>
         <h1 ref={ref} className="text-4xl font-bold mb-6 mt-10">
            Характеристики
         </h1>
         <article className="bg-orange-100 p-8">
            {data.map((category, index) => (
               <div key={index} className="mb-10">
                  <span className="font-bold text-xl grid col-span-3 category-title">
                     {category.title}
                  </span>
                  <section className="grid grid-cols-3 mt-4">
                     {category.items.map((item, i) => (
                        <React.Fragment key={i}>
                           <div className="p-2 item-name">{item.name}</div>
                           <div className="col-span-2 item-value">{item.value}</div>
                        </React.Fragment>
                     ))}
                  </section>
               </div>
            ))}
         </article>
      </div>
   );
});

export default Specifications;
