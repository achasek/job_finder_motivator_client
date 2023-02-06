import { useContext, useEffect } from "react";
import { ConstContext, UserContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { useAuth0} from '@auth0/auth0-react'

const Login = () => {
    const { BACK_URI } = useContext(ConstContext);
    const { setCurrUser } = useContext(UserContext);
    const navigate = useNavigate();
    const { user, getAccessTokenSilently } = useAuth0();
    // console.log('in login')

    const handleLogin = async () => {
        // console.log('user: ', user);
        const accessToken = await getAccessTokenSilently();
        // console.log('accessToken: ', accessToken)

        const doFetch = async () => {
            try {
                // console.log(BACK_URI +'/api/v1/users/login')
                const response = await fetch(BACK_URI + '/api/v1/users/login', {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${accessToken}`,
                    }});
                if(response.ok){
                    setCurrUser(user);
                    // console.log(user);
                    navigate(`/`);
                }
            } catch (error) {
                console.error(error);
            }
        }
        //TODO: Login API then re-emable the following line
        // doFetch(); 

    }

    useEffect(()=>{ handleLogin() },[])

    return (
        <section>
            <h1>logging in</h1>
        </section>    )
};

export default Login;
