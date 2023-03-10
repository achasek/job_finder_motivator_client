import { Auth0Provider } from "@auth0/auth0-react";
import React from "react";
// import { useNavigate } from "react-router-dom";

export const Auth0ProviderWithConfig = ({ children }) => {
  // const navigate = useNavigate();
  const domain = process.env.REACT_APP_AUTH0_DOMAIN;
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
  const redirectUri = process.env.REACT_APP_AUTH0_CALLBACK_URL;
  // const redirectUri = window.location.origin;
  const audience = process.env.REACT_APP_AUTH0_AUDIENCE;
  // const onRedirectCallback = (appState) => {
  //   navigate(appState?.returnTo || window.location.pathname);
  // }

  if (!(domain && clientId && redirectUri && audience)) {
    console.error("missing const from auth provider");
    // console.error({domain});
    // console.error({clientId});
    // console.error({redirectUri});
    // console.error({audience});
    return null;
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={redirectUri}
      audience={audience}
      // onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};
