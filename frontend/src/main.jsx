import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import './lib/i18n'; // Force i18n initialization
import Providers from './components/Providers';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <Providers>
    <App />
  </Providers>
);
