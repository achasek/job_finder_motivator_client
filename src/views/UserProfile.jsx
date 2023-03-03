import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useContext, useState } from "react";
import { ProfileSideBar } from "../components";
import { ConstContext, UserContext } from "../App";
import "../styles/UserProfile.css";

const UserProfile = () => {
  const { user, getAccessTokenSilently } = useAuth0();
  const { currUser, setCurrUser } = useContext(UserContext);
  const { BACK_URI } = useContext(ConstContext);
  const [displayName, setDisplayName] = useState("");
  const [showInput, setShowInput] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await getAccessTokenSilently();
      const res = await axios.put(
        `${BACK_URI}/api/user/update`,
        { display_name: displayName },
        {
          headers: {
            "content-type": "application/json",
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      setCurrUser({ ...currUser, display_name: res.data.data.user.display_name });
      setShowInput(false);
    } catch (err) {
      console.error(err);
    }
  };

  return currUser ? (
    <div className="user__page">
        <div className="fly__image"></div>
      <div className="User-page__container">
        <div className="User__titleContainer">
          <h2 className="User__title">Welcome to your profile {currUser.display_name}</h2>
        </div>
        {showInput ? (
          <form onSubmit={handleSubmit}>
            <input
              className="username__input"
              placeholder="New Display Name"
              type="text"
              id="displayName"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
            <button className="update__username" type="submit">
              Update Username
            </button>
            {console.log("This the current user: ",currUser)}
          </form>
        ) : (
          <button className="update__username" onClick={() => setShowInput(true)}>
            Change Username
          </button>
        )}
        <div className="User__avatarContainer">
          <img
            src={currUser.picture ? currUser.picture : user.picture}
            alt="Profile"
            className="User__avatar"
          />
        </div>
        <div className="FlyingDino__img"></div>
      </div>
      <ProfileSideBar />
    </div>
  ) : null;
};

export default UserProfile;
