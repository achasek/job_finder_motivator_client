import React, { useEffect, useState } from "react";
import { CodeSnippet } from "../components/code-snippet";
import { PageLayout } from "../components/page-layout";

export const ExamplePage = () => {
  const [message, setMessage] = useState("");

  return (
    <PageLayout>
      <div className="content-layout">
        <h1 id="page-title" className="content__title">
          Example Page
        </h1>
        <div className="content__body">
          <p id="page-description">
            <span>
              This page retrieves an <strong>example message</strong> from an
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