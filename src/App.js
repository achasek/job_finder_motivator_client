// import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { SharedLayout, Landing, NotFound, CallbackView, UserRoutes, 
         TestAPIRoute, TestAPIprotected, TestAPIAdmin, Dashboard, Profile, About, 
         UserProtectedRoute, Materials, CreateMaterialsForm, SocialDash, CalendarP, 
         UserProfile, JobApps, CreateJobForm } from "./views";
import Test from "./pages/Test";
import TestTwo from "./pages/TestTwo";
import { useAuth0 } from "@auth0/auth0-react";
import { Auth0LoginRequired, PageLoader, TodoList, Calendar, DashboardApps } from "./components";
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
    <BrowserRouter>
      <ConstContext.Provider value={{ BACK_URI, LOGOUT_URL, AUDIENCE }}>
        <UserContext.Provider value={{ currUser, setCurrUser }}>
          <DataContext.Provider value={{ open, setOpen, modalType, setModalType}}>
            <ThemeProvider theme={theme}>
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
                  <Route path='/dashboard' element={<UserProtectedRoute user={currUser}><Dashboard/></UserProtectedRoute>} /> 
                  <Route path='/profile' element={<UserProtectedRoute user={currUser}><Profile/></UserProtectedRoute>} /> 
                  <Route path="test/admin" element={<Auth0LoginRequired component={TestAPIAdmin} />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/todo" element={<UserProtectedRoute user={currUser}><TodoList /></UserProtectedRoute>} />
                  <Route path="/jobs" element={<UserProtectedRoute user={currUser}><JobApps /></UserProtectedRoute>} />
                  <Route path="/add/jobs" element={<UserProtectedRoute user={currUser}><CreateJobForm /></UserProtectedRoute>} />
                  <Route path="/materials" element={<UserProtectedRoute user={currUser}><Materials /></UserProtectedRoute>} />
                  <Route path="/add/materials" element={<UserProtectedRoute user={currUser}><CreateMaterialsForm /></UserProtectedRoute>} />
                  <Route path="/Social" element={<UserProtectedRoute user={currUser}><SocialDash /></UserProtectedRoute>} />
                  <Route path="/Calendar" element={<UserProtectedRoute user={currUser}><CalendarP /></UserProtectedRoute>} />
                  <Route path="/User/Profile" element={<UserProtectedRoute user={currUser}><UserProfile /></UserProtectedRoute>} />

                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
            </ThemeProvider>
          </DataContext.Provider>
        </UserContext.Provider>
      </ConstContext.Provider>
    </BrowserRouter>
  );
}

export default App;
