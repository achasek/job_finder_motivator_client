import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {

    const { user } = useAuth0();
    console.log(user);

    if (!user) {
        return null;
    }

    return (
        <div className="Profile__container">
            <h1>Profile page</h1>
        </div>
    )
}

export default Profile;
