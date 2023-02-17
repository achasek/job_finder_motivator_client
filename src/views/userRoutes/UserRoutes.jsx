import { Routes, Route } from "react-router-dom";
import { NotFound, Login, Logout, SignUp } from "..";
import { Auth0LoginRequired } from "../../components";

const UserRoutes = () => {

    return (
        <Routes>
            <Route path='login' element={<Auth0LoginRequired component={Login} />} />
            <Route path='logout' element={<Logout />} />
            <Route path='signup' element={<SignUp />} />
            <Route path='*' element={<NotFound />} />
        </Routes>
    )
};

export default UserRoutes;
