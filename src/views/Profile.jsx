import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { CodeSnippet } from "../components/code-snippet";

const Profile = () => {
  const { user } = useAuth0();
  console.log(user)

  if (!user) {
    return null;
  }

  return (
      <div className="profile-page__container">
        <div className="profile__titleContainer">
        <h2 className="profile__title">Logged into {user.name}'s Profile </h2>
        </div>
            <div className="profile__avatarContainer">
                <a href="/about">
              <img
                src={user.picture}
                alt="Profile"
                className="profile__avatar"
              />
                </a>
            </div>
            <div className="profile__details">
              <CodeSnippet
                title="Decoded ID Token"
                code={JSON.stringify(user, null, 2)}
              />
            </div>
      </div>
  );
};

export default Profile;