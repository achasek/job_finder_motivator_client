import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import { CodeSnippet } from "../components/code-snippet";
import { PageLayout } from "../components/page-layout";
// import { getAdminResource } from "../services/message.service";
import { callExternalApi } from "../services/external-api.service";

 export const AdminPage = () => {
  const [message, setMessage] = useState("");
  const {getAccessTokenSilently} = useAuth0();
  const apiServerUrl = process.env.REACT_APP_API_SERVER_URL;

  const getAdminResource = async () => {
    const token = await getAccessTokenSilently();
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

  useEffect(() => {
    let isMounted = true;

    const getMessage = async () => {
      const { data, error } = await getAdminResource();

      if (!isMounted) {
        return;
      }

      if (data) {
        setMessage(JSON.stringify(data, null, 2));
      }

      if (error) {
        setMessage(JSON.stringify(error, null, 2));
      }
    };

    getMessage();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <PageLayout>
      <div className="content-layout">
        <h1 id="page-title" className="content__title">
          Admin Page
        </h1>
        <div className="content__body">
          <p id="page-description">
            <span>
              This page retrieves an <strong>admin message</strong> from an
              external API.
            </span>
            <span>
              <strong>
                Only authenticated users with the{" "}
                <code>read:admin-messages</code> permission should access this
                page.
              </strong>
            </span>
          </p>
          <CodeSnippet title="Admin Message" code={message} />
        </div>
      </div>
    </PageLayout>
  );
};

