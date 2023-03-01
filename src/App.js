// import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { SharedLayout, Landing, NotFound, CallbackView, UserRoutes, 
         TestAPIRoute, TestAPIprotected, TestAPIAdmin, Profile, About, 
         UserProtectedRoute, Materials, CreateMaterialsForm, SocialDash, CalendarP } from "./views";
import Test from "./pages/Test";
import TestTwo from "./pages/TestTwo";
import { useAuth0 } from "@auth0/auth0-react";
import { Auth0LoginRequired, PageLoader, TodoList, Calendar, DashboardApps } from "./components";
import { createMuiTheme } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";


export const ConstContext = React.createContext();
export const UserContext = React.createContext();
export const DataContext = React.createContext();

const theme = createTheme();

function App() {
  const BACK_URI = process.env.REACT_APP_API_SERVER_URL;
  const LOGOUT_URL = process.env.REACT_APP_AUTH0_LOGOUT_URL;
  const AUDIENCE = process.env.REACT_APP_AUTH0_AUDIENCE;
  const [currUser, setCurrUser] = useState({});
  const { isLoading } = useAuth0();
 
  //modal stuff
  const [open, setOpen] = useState(false);
  const [modalType, setModalType] = useState();

  if (isLoading) {
    return (
      <div className="page-layout">
        <PageLoader />
      </div>
    );
  }
  console.log(currUser, 'THIS IS CURR USER')
  // useEffect(() => {
  //   console.log(currUser, 'USE-EFFECT CURR USER:')
  // }, [currUser])

  return (
            <ThemeProvider theme={theme}>
    <BrowserRouter>
      <ConstContext.Provider value={{ BACK_URI, LOGOUT_URL, AUDIENCE }}>
        <UserContext.Provider value={{ currUser, setCurrUser }}>
          <DataContext.Provider value={{ open, setOpen, modalType, setModalType}}>
              <Routes>
                <Route path="/" element={<SharedLayout />}>
                  <Route index element={<Landing />} />
                  <Route path="users/*" element={<UserRoutes />} />
                  <Route path="callback" element={<CallbackView />} />
                  <Route path='test/public' element={<TestAPIRoute />} /> 
                  <Route exact path='test' element={< Test />} /> 
                  <Route exact path='testtwo' element={< TestTwo />} /> 
                  <Route exact path='testthree' element={<UserProtectedRoute user={currUser}>< DashboardApps /></UserProtectedRoute>} /> 
                  <Route path='test/protected' element={<Auth0LoginRequired component={TestAPIprotected} />} /> 
                  <Route path='/profile' element={<Auth0LoginRequired component={Profile} />} /> 
                  <Route path="test/admin" element={<Auth0LoginRequired component={TestAPIAdmin} />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/todo" element={<TodoList />} />
                  <Route path="*" element={<NotFound />} />
                  <Route path="/resources" element={<Materials />} />
                  <Route path="/add/resources" element={<CreateMaterialsForm />} />
                  <Route path="/Social" element={<SocialDash />} />
                  <Route path="/Calendar" element={<CalendarP />} />
                </Route>
              </Routes>
          </DataContext.Provider>
        </UserContext.Provider>
      </ConstContext.Provider>
    </BrowserRouter>
            </ThemeProvider>
  );
}

export default App;
