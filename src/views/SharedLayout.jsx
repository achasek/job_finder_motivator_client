import { NavLink, Outlet } from "react-router-dom";
import { NavBarButtons } from "../components";

const SharedLayout = () => {            
    

    return (
        <>
            <header>
                <div className="nav-area" style={{display: "flex", justifyContent:"space-between"}}>
                    <NavLink to="/test/public" className='logo'>public_test_route</NavLink>
                    <NavLink to="/test/protected" className='logo'>protected_test_route</NavLink>
                    <NavLink to="/test/admin" className='logo'>admin_test_route</NavLink>
                    <NavLink to="/test/admin" className='logo'>admin_test_route</NavLink>
                    <NavLink to="/profile" className='logo'>profile route</NavLink>
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
