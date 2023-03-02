import { useContext, useEffect } from "react";
import { UserContext, ConstContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { callExternalApi } from "../../services/external-api.service";

const Logout = () => {
    
    const { BACK_URI } = useContext(ConstContext);
    const { setCurrUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        const config = {
            url: `${BACK_URI}/api/user/logout`,
            method: "GET",
            headers: {
                "content-type": "application/json",
            }
        }
        const { status } = await callExternalApi({config});
        if(status.code === 200){
            setCurrUser(null);
            navigate(`/`);
        }
    }

    useEffect(()=>{ handleLogout() },[])

    return (
        <h1>Logout</h1>
    )
};

export default Logout;
