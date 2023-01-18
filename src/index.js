import "@fontsource/comfortaa"
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ContextProvider from './application/ContextProvider';
import { Auth0Provider } from "@auth0/auth0-react";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-jv6jyswcrhegjme6.us.auth0.com"
      clientId="LYoQbr4fM0ItnNOrTXkWPx884sWUdePT"
      redirectUri={window.location.origin}
    >
      <ContextProvider>
        <App />
      </ContextProvider>
    </Auth0Provider>
  </React.StrictMode>
);
