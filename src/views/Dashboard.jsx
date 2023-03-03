import React from "react";
import "../styles/dashboard.css"
import Kanban from "./Kanban";
import DashboardApps from "../components/DashboardApps";
import { TodoList, ProfileSideBar, Calendar } from "../components";

const Dashboard = () => {
  return (
    <div className="profile__layout">
        <div className="sidebar">
          <ProfileSideBar />
        </div>
        <div className="profile-page__container">
          <div className="dash__apps">
            <DashboardApps />
          </div>
        <div className="CLN">
          <Calendar />
        </div>
        <div className="TD">
          <TodoList/>
        </div>
        {/* <div className="KB">
          <Kanban />
        </div> */}
      </div>
    </div>
  );
};

export default Dashboard;