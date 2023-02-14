import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { CodeSnippet } from "../components/code-snippet";
import { PageLayout } from "../components/page-layout";
// import { getProtectedResource } from "../services/message.service";
import { callExternalApi } from "../services/external-api.service";

export const ProtectedPage = () => {
  const [message, setMessage] = useState("");
  const {getAccessTokenSilently} = useAuth0();
  const apiServerUrl = process.env.REACT_APP_API_SERVER_URL;

  const getProtectedResource = async () => {
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
  
  useEffect(() => {
    // let isMounted = true;

    const getMessage = async () => {
      const { data, error } = await getProtectedResource();

      // if (!isMounted) {
      //   return;
      // }

      if (data) {
        setMessage(JSON.stringify(data, null, 2));
      }

      if (error) {
        setMessage(JSON.stringify(error, null, 2));
      }
    };

    getMessage();

    // return () => {
    //   isMounted = false;
    // };
  }, []);

  return (
      <div className="content-layout">
        <h1 id="page-title" className="content__title">
          Protected Page
        </h1>
        <div className="content__body">
          <p id="page-description">
            <span>
              This page retrieves a <strong>protected message</strong> from an
              external API.
            </span>
            <span>
              <strong>Only authenticated users can access this page.</strong>
            </span>
          </p>
          <CodeSnippet title="Protected Message" code={message} />
        </div>
      </div>
  );
};
