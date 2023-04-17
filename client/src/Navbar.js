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
        <header class="bg-slate-900">
            <nav class="mx-auto flex max-w-7xl items-center justify-between gap-x-6 p-6 lg:px-8">
                <div class="hidden lg:flex lg:gap-x-12">
                <NavLink className="NavLink" to = "./" end>Home</NavLink>
                <NavLink className="NavLink" to = "/venues">Venues</NavLink>
                <NavLink className="NavLink" to = "/events">Events</NavLink>
                </div>
                {user ? (
                    <div class="flex justify-between gap-x-6">
                        <p className="logout">Welcome, {user.username}!</p>
                        <button className="logoutbtn" onClick={handleLogout}>Logout</button>
                    </div>
                ) : (
                    <Link className="NavLogin" to="/login">Login</Link>
                )}
            </nav>
        </header>

    )
}
export default Navbar