import { NavLink, Outlet } from "react-router-dom";
import { NavBarButtons } from "../components";

const SharedLayout = () => {            
    

    return (
        <>
            <header className="nav__header">
                <div className="nav__area">
                    <div className="nav__logo"></div>
                    <NavLink to="/" className='nav__link'>Home</NavLink>
                    <NavLink to="/about" className='nav__link'>About</NavLink>
                    <NavLink to="/profile" className='nav__link'>Profile</NavLink>
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
