import { Error404, Error500 } from "../components/Error/Error";
import MainLayout from "../layouts/main";

export default function NotFound() {
   return (
      <MainLayout main="flex-grow mb-56 mt-60" body="flex flex-col min-h-screen">
         <Error404 />
      </MainLayout>
   )
}