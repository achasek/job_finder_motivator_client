import { useContext, useEffect } from "react";
import { ConstContext, UserContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { useAuth0} from '@auth0/auth0-react'
import { callExternalApi } from "../../services/external-api.service";

const Login = () => {
    const { BACK_URI } = useContext(ConstContext);
    const { setCurrUser } = useContext(UserContext);
    const navigate = useNavigate();
    const { getAccessTokenSilently, user } = useAuth0();

    const handleLogin = async () => {
        console.log(user)
        const token = await getAccessTokenSilently();
        const config = {
            // change
            url: `${BACK_URI}/api/user/login`,
            // change to update method
            method: "GET",
            headers: {
                "content-type": "application/json",
                "Authorization": `bearer ${token}`
            }
        }
        const { data, status, error } = await callExternalApi({config});
        if (data) {
            // point to dashboard
            if (status.code === 200) { // returning user loging in
                setCurrUser(data.user);
                navigate(`/`);  // TODO: redirect to dashboard here
            // sign up route
            } else if (status.code === 201) { // new user loging in
                setCurrUser(data.user);
                navigate(`/users/signup`);  // TODO: do new user profile setup path here 
            } else { // should never hit
                console.error('ERROR: invalid login response')
            }  
        } else {
            console.error(`ERROR: problem with login: ${error.message}`)
        }
    }

    useEffect(()=>{ handleLogin() },[])

    return (
        <section>
            <h1>logging in</h1>
        </section>    )
};

export default Login;
