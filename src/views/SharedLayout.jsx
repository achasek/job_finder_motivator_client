import { NavLink, Outlet } from "react-router-dom";
import { NavBarButtons } from "../components";
import { ConstContext, UserContext } from '../App';
import React, { useContext } from "react";

const SharedLayout = () => {          
    const { currUser } = useContext(UserContext);  
    console.log("current user",currUser)
    

    return (
        <>
            <header className="nav__header">
                <div className="nav__area">
                    <a href="/">
                        <div className="nav__logo"></div>
                    </a>
                    <div className="nav__block"></div>
                    <NavLink to="/" className='nav__link'>Home</NavLink>
                    <NavLink to="/dashboard" className='nav__link'>My Dash</NavLink>
                    {currUser?._id && <NavLink to="/user/profile" className='nav__link'>My Profile</NavLink>}
                    {/* <NavLink to="/test/public" className='nav__link'>public-test</NavLink>
                    <NavLink to="/test/protected" className='nav__link'>protected-test</NavLink>
                    <NavLink to="/test/admin" className='nav__link'>admin-test</NavLink> */}
                    &nbsp; | &nbsp;
                    <NavBarButtons />
                </div>
            </header>
            <section>
                <Outlet />
            </section>
        </>
    );
    
}



export default SharedLayout;
