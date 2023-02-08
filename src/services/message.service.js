import { callExternalApi } from "./external-api.service";
import { useAuth0 } from "@auth0/auth0-react";

const apiServerUrl = process.env.REACT_APP_API_SERVER_URL;
export const getPublicResource = async () => {
  const config = {
    url: `${apiServerUrl}/api/messages/public`,
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  };

  const { data, error } = await callExternalApi({ config });
  
  return {
    data: data || null,
    error,
  };
};

export const getProtectedResource = async () => {
  const {getAccessTokenSilently} = useAuth0();
  const token = await getAccessTokenSilently();
  const config = {
    url: `${apiServerUrl}/api/messages/protected`,
    method: "GET",
    headers: {
      "content-type": "application/json",
      "Authorization": `bearer ${token}`
    },
  };

  const { data, error } = await callExternalApi({ config });
  
  console.log({response: data ? data : error});

  return {
    data: data || null,
    error,
  };
};

export const getAdminResource = async () => {
  const token = useAuth0().getAccessTokenSilently();
  const config = {
    url: `${apiServerUrl}/api/messages/admin`,
    method: "GET",
    headers: {
      "content-type": "application/json",
      "Authorization": `bearer ${token}`
    },
  };

  const { data, error } = await callExternalApi({ config });
  
  console.log({response: data ? data : error});

  return {
    data: data || null,
    error,
  };
};
