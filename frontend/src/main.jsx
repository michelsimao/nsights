import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@ds/styles.css';
import './app.css';
// Antes de qualquer componente: publica window.React e avalia o bundle do DS.
import './ds/index.js';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
