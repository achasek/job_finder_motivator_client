import { useAuth0 } from "@auth0/auth0-react";
import React, { useContext } from "react";
import "../styles/UserProfile.css";
import { ProfileSideBar } from "../components";
import { UserContext } from "../App";


const UserProfile = () => {
  const { user } = useAuth0();
  const { currUser } = useContext(UserContext);

  console.log({user}, {currUser});
  if (!user) {
    return null;
  }
  return (
    <div className="user__page">
      <div className="User-page__container">
        <div className="User__titleContainer">
        <h2 className="User__title">Welcome to your profile {user.name}</h2>
        </div>
            <div className="User__avatarContainer">
              <img
                src={currUser.picture ? currUser.picture : user.picture}
                alt="Profile"
                className="User__avatar"
              />
            </div>
      </div>
      <ProfileSideBar />
    </div>
  );
};
export default UserProfile;