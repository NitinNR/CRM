// scroll bar
import 'simplebar/src/simplebar.css';

import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import { SnackbarProvider } from 'notistack';

//
import App from './App';
import * as serviceWorker from './serviceWorker';

// Auth 
import { AuthProvider } from './contexts/JWTContext';

// ----------------------------------------------------------------------

ReactDOM.render(
  <AuthProvider>
  <HelmetProvider>
    <BrowserRouter>
    <SnackbarProvider maxSnack={3}>
      <App />
      </SnackbarProvider>
    </BrowserRouter>
  </HelmetProvider>
  </AuthProvider>,
  document.getElementById('root')
);

// If you want to enable client cache, register instead.
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
