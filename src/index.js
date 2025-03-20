import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import "bootstrap/dist/css/bootstrap.min.css";
import { ApiProvider } from './contexts/ApiContext';
import "@fontsource/playfair-display";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <ApiProvider>
    <App />
    </ApiProvider>
  </React.StrictMode>
);
