import { NavLink } from "react-router-dom";

function Nav() {

    return (
        <>
                <div className="nav-container">
                        <nav className="nav">
                            <NavLink to="/admin/" className="nav-link" style={
                                ({ isActive }) =>
                                    isActive ? {
                                        color: '#FF4742'
                                    } : null
                            }><h4>Admin</h4></NavLink>
                            <NavLink to="/" className="nav-link" style={
                                ({ isActive }) =>
                                    isActive ? {
                                        color: '#FF4742'
                                    } : null
                            }><h4>Scooters information</h4></NavLink>
                        </nav>
                </div>
        </>
    )
}

export default Nav;