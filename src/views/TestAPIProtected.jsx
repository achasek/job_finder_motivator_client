import { useAuth0 } from "@auth0/auth0-react";
// import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { ConstContext } from "../App";
import { ProtectedPage } from "../pages/protected-page"

const TestApiProtected = () => {
    // const [response, setResponse] = useState("");
    // const { getAccessTokenSilently } = useAuth0();
    // const {BACK_URI} = useContext(ConstContext);

    // useEffect(() => {
    //     const getApiResponse = async () => {
    //         const accessToken = await getAccessTokenSilently();
    //         console.log({BACK_URI});
    //         try {
    //             const resp = await fetch(BACK_URI+'/api/test_routes/protected', {
    //                 method: 'GET',
    //                 credentials: 'include',
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                     Authorization: `Bearer ${accessToken}`,
    //                 }});
    //             if (resp.ok) {
    //                 const jsonResp = await resp.json();
    //                 setResponse(jsonResp);
    //             }
    //         } catch (error) {
    //             console.error(error);
    //         }
    //     };

    //     getApiResponse();
    // }, []);

    return (
        <ProtectedPage />
        // <>
        //     <h1>Attempting to access api/test_route/protected</h1>
        //     <br />
        //     {response ? (<>
        //             <p>data = {response.data}</p>
        //             <p>message = {response.message}</p>
        //             <p>status = {response.status}</p>
        //         </>):null}
        // </>
    );
};

export default TestApiProtected;
