import React from "react";
import "../styles/profile.css"
import Kanban from "./Kanban";
import { TodoList, ProfileSideBar, Calendar } from "../components";

const Profile = () => {


  return (
    <div>
  <ProfileSideBar />

    <div className="profile-page__container">
       <Kanban />
       <TodoList/>
      </div>
      <Calendar />
      </div>
  );
};

export default Profile;