/* Компоненты */
import getRoutes from './routes/routes';
import { setAccessToken, checkTokenExpiration } from './services/authUpdate';
import { useEffect } from 'react';

/*Style */
import './style/App.css';
import './style/banner.css';
import './style/adaptive/pages/adaptive.css';

function App() {
   // TODO Auth Значения
   // localStorage.setItem('accessToken', '');
   // localStorage.setItem('refreshToken', '');
   const accessToken = localStorage.getItem('accessToken');
   const refreshToken = localStorage.getItem('refreshToken')

   console.log('accessToken:', accessToken);
   console.log('refreshToken:', refreshToken);
   return getRoutes()
}

export default App;  