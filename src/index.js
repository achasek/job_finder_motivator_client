import React from 'react';
import ReactDOM from 'react-dom/client';
import "./styles/styles.css";
import App from './App';
import { Auth0ProviderWithConfig } from "./auth0-provider-with-config"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //comment both lines to switch from StrictMode to allow new user path. 
  //strict mode double mounts components.
 //<React.StrictMode> 
    <Auth0ProviderWithConfig>
      <App />
    </Auth0ProviderWithConfig>
  //</React.StrictMode> 
  //comment both lines to switch from StrictMode to allow new user path. 
  //strict mode double mounts components.
);
