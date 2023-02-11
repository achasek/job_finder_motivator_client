import { NavLink, Outlet } from "react-router-dom";
import { NavBarButtons } from "../components";

const SharedLayout = () => {

    return (
        <>
            <header>
                <div className="nav__area">
                    <h1 className="nav__title">Thriver!</h1>
                    <NavLink to="/" className='nav__link'>Home</NavLink>
                    <NavLink to="/test/public" className='nav__link'>public_test_route</NavLink>
                    <NavLink to="/test/protected" className='nav__link'>protected_test_route</NavLink>
                    <NavLink to="/test/admin" className='nav__link'>admin_test_route</NavLink>
                    {/* <NavBarButtons /> */}
                </div>
            </header>
            <section>
                <Outlet />
            </section>
        </>
    );
}

export default SharedLayout;
