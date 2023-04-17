import React from 'react'
import {NavLink, Link} from 'react-router-dom'
import './index.css';


function Navbar({user, onLogout}) {
    function handleLogout() {
        fetch("/logout", {
            method: "DELETE",
        }).then(() => onLogout());
    }
    return(
        <nav className="nav">
            <NavLink className="NavLink" to = "./" end>Home</NavLink>
            <NavLink className="NavLink" to = "/venues">Venues</NavLink>
            <NavLink className="NavLink" to = "/events">Events</NavLink>
            {user ? (
                <div>
                    <p>Welcome, {user.username}!</p>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <>
                    <Link to="/signup">Signup</Link>
                    <Link to="/login">Click Here to Login</Link>
                </>
            )}
        </nav>
    )
}
export default Navbar