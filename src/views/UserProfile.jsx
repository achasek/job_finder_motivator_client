import { useAuth0 } from "@auth0/auth0-react";
import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import "../styles/UserProfile.css";
import { ProfileSideBar } from "../components";
import { UserContext, ConstContext } from "../App";

const UserProfile = () => {
  const { user, getAccessTokenSilently } = useAuth0();
  const { currUser, setCurrUser } = useContext(UserContext);
  const { BACK_URI } = useContext(ConstContext);
  const [displayName, setDisplayName] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await getAccessTokenSilently();
        const res = await axios.get(`${BACK_URI}/api/user`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setCurrUser(res.data.data.user);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUserData();
  }, [BACK_URI, getAccessTokenSilently, setCurrUser]);

  const handleChange = (e) => {
    setDisplayName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await getAccessTokenSilently();
      const formData = { display_name: displayName };
      const res = await axios.put(
        `${BACK_URI}/api/user/update`,
        formData,
        {
          headers: {
            "content-type": "application/json",
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      setCurrUser({ ...currUser, name: res.data.data.user.display_name });
    } catch (err) {
      console.error(err);
      // Display error message to the user
    }
  };

  if (!currUser) {
    return null;
  }

  return (
    <div className="user__page">
      <div className="User-page__container">
        <div className="User__titleContainer">
          <h2 className="User__title">
            Welcome to your profile {currUser.name}
          </h2>
        </div>
        <div className="User__avatarContainer">
          <img
            src={currUser.picture ? currUser.picture : user.picture}
            alt="Profile"
            className="User__avatar"
          />
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="displayName">Display Name:</label>
            <input type="text" id="displayName" onChange={handleChange} />
          </div>
          <button type="submit">Update Username</button>
        </form>
      </div>
      <ProfileSideBar />
    </div>
  );
};

export default UserProfile;
