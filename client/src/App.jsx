import React, { useState, useEffect } from 'react';

/*Style */
import './style/App.css';
import './style/banner.css';
import './style/adaptive/pages/adaptive.css';

/* Компоненты */
import getRoutes from './components/routes/routes';

function App() {
   // TODO Auth Значения 
   // localStorage.getItem('AuthAccessToken')
   // localStorage.getItem('AuthRefreshToken')
   // Основные маршруты
   return getRoutes()
}

export default App;