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
                    <div>
                        <p >Welcome, {user.username}!</p>
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                ) : (
                    <>
                        <Link className="NavLink" to="/login">Login</Link>
                        {/* <Link className="NavLink" to="/signup">SignUp</Link> */}
                    </>
                )}
            </nav>
        </header>

    )
}
export default Navbar