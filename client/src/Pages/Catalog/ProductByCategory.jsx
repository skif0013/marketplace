import { useParams } from "react-router-dom"

export default function ProductByCategory() {
   const { category } = useParams();
   console.log(category);

   return (
      <>
         <h1>Сортировать по: {category}</h1>
      </>
   )
}