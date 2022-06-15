import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import DataService from './DataService';
import { ContextProvider } from 'store/context';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <ContextProvider>
      <DataService>
        <App />
      </DataService>
    </ContextProvider>
  </React.StrictMode>
);
