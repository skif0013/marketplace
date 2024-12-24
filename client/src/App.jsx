import React, { useEffect, useState } from 'react';
import getRoutes from './components/routes/routes';

/*Style */
import './style/App.css';
import './style/banner.css';
import './style/adaptive/pages/adaptive.css';

function App() {
   const [isAunthenticated, SetIsAunthenticated] = useState(false);

   useEffect(() => {
      const checkAuthentication = async () => {
         try {
            await checkAuth();
         } catch (error) {
            SetIsAunthenticated(false)
         }
      }
   })
   return (
      <>
         {getRoutes()} {/* Основные маршруты */}
      </>
   );
}

export default App;