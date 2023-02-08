import { NavLink, Outlet } from "react-router-dom";
import { NavBarButtons } from "../components";

const SharedLayout = () => {

    return (
        <>
            <header>
                <div className="nav-area">
<<<<<<< HEAD
                     {/* <NavLink to='/' className='logo'><img className="nav-logo" src='/kayla-cares-4-kids-logo.png' alt="Kayla Cares 4 Kids Logo" /></NavLink>
                    <Navbar /> */}
=======
                    <NavLink to="/test/public" className='logo'>public_test_route</NavLink>
                    <NavLink to="/test/protected" className='logo'>protected_test_route</NavLink>
                    <NavLink to="/test/admin" className='logo'>admin_test_route</NavLink>
                    <NavBarButtons />
>>>>>>> 520c03e399d4b7f54c76da1aa0daf264d7c4683a
                </div>
            </header>
            <section>
                <Outlet />
            </section>
        </>
    );
}

export default SharedLayout;
