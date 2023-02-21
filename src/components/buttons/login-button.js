import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = async () => {
    await loginWithRedirect({
      prompt: "login",
      appState: {
        returnTo: "/users/login",
      },
      
    });
  };

  return (
    <button className="nav__link" onClick={handleLogin}>
      Log In
    </button>
  );
};

export default LoginButton;
