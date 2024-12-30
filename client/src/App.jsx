/* Компоненты */
import getRoutes from './routes/routes';

/*Style */
import './style/App.css';
import './style/banner.css';
import './style/adaptive/pages/adaptive.css';

function App() {
   // TODO Auth Значения
   console.log(localStorage.getItem('accessToken'));
   console.log(localStorage.getItem('refreshToken'));
   return getRoutes()
}

export default App;  