import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './style/index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
   <StrictMode>
      <BrowserRouter basename='/'>
         <App />
      </BrowserRouter>
   </StrictMode>
);