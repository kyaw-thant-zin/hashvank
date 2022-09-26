import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

// STORE
import { persistor, store } from './app/store';
import { injectStore } from './api/Api';
import { PersistGate } from 'redux-persist/integration/react';

//  MAIN APP
import App from './App';



import reportWebVitals from './reportWebVitals';


// THEME
import { theme } from "./views/layout/Theme";
import { ThemeProvider } from '@mui/material';

const container = document.getElementById('root');
const root = createRoot(container);
injectStore(store);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
