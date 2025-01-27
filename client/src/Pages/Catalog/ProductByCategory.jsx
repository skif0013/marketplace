import { useParams } from "react-router-dom"
import MainLayout from "../../layouts/main";


export default function ProductByCategory() {
   const { category } = useParams();
   console.log(category);

   return (
      <MainLayout body="flex flex-col min-h-screen" main="flex-grow mb-56 mt-60">
         <h1>Сортировать по: {category}</h1>
      </MainLayout>
   )
}