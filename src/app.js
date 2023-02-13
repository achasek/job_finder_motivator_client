// import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { SharedLayout, Landing, NotFound, CallbackView, UserRoutes, TestAPIRoute, TestAPIprotected, TestAPIAdmin, } from "./views";
import {Profile} from "./pages/Profile";
import Test from "./pages/Test";
import TestTwo from "./pages/TestTwo";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { Auth0LoginRequired, PageLoader } from "./components";

export const ConstContext = React.createContext();
export const UserContext = React.createContext();
export const DataContext = React.createContext();

function App() {
    const BACK_URI = process.env.REACT_APP_API_SERVER_URL;
  const LOGOUT_URL = process.env.REACT_APP_AUTH0_LOGOUT_URL;
  const AUDIENCE = process.env.REACT_APP_AUTH0_AUDIENCE;
  const [currUser, setCurrUser] = useState({});
  const { isLoading } = useAuth0();
  const {getAccessTokenSilently} = useAuth0();
  const token = getAccessTokenSilently();

  
  
 const getProtectedResource = async () => { 
  const token = await getAccessTokenSilently();    
      const config = {
        url: `${BACK_URI}/api/user/seed`,
        method: "POST",
        headers: {
          "content-type": "application/json",
          "Authorization": `bearer ${token}`
        }
  }
  axios(config)
  .then(response => {
    const name = response.data.payload.name
    const email = response.data.payload.email
    axios({
      method: 'POST',
      url: `${BACK_URI}/api/user/create/${name}/${email}`,
      headers: {
        "content-type": "application/json",
        "Authorization": `bearer ${token}`
      }
    }).then(response => {
      console.log(response)
    }).catch(err =>{
      console.log("error", err)
    })   
  }).catch(err =>{
    console.log("error", err)
  })
};

//runs the function above and logs the bearer token, token acquired using the getAccessTokenSilently() function at the top of the page
  useEffect(() => {
     getProtectedResource()
    console.log(token)
 }, [])

  if (isLoading) {
    return (
      <div className="page-layout">
        <PageLoader />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <ConstContext.Provider value={{ BACK_URI, LOGOUT_URL, AUDIENCE }}>
        <UserContext.Provider value={{ currUser, setCurrUser }}>
          <Routes>
            <Route path="/" element={<SharedLayout />}>
              <Route index element={<Landing />} />
              <Route path="users/*" element={<UserRoutes />} />
              <Route path="callback" element={<CallbackView />} />
              <Route path='test/public' element={<TestAPIRoute />} /> 
              <Route exact path='test' element={< Test />} /> 
              <Route exact path='testtwo' element={< TestTwo />} /> 
              <Route path='test/protected' element={<Auth0LoginRequired component={TestAPIprotected} />} /> 
              <Route path='/profile' element={<Auth0LoginRequired component={Profile} />} /> 
             <Route path="test/admin" element={<Auth0LoginRequired component={TestAPIAdmin} />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </UserContext.Provider>
      </ConstContext.Provider>
    </BrowserRouter>
  );
}



export default App;
