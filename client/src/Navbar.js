import {React, useState} from 'react'
import {SlMenu} from 'react-icons/sl'
import {NavLink, Link} from 'react-router-dom'
import './index.css';


function Navbar({user, setUser, onLogout}) {
    const [nav, setNav] = useState(false)

    const handleNav = () => {
        setNav(!nav)
    }

    function handleLogout() {
        fetch("/logout", {
            method: "DELETE",
        }).then(
            // () => onLogout()
            setUser(null)
        );
    }
    return(
        <header class="bg-slate-900">
            <nav class="mx-auto flex max-w-7xl items-center justify-between gap-x-6 p-6 lg:px-8">
                <div class="hidden lg:flex lg:gap-x-12">
                <NavLink className="NavLink" to = "./" end>Home</NavLink>
                <NavLink className="NavLink" to = "/venues">Venues</NavLink>
                <NavLink className="NavLink" to = "/events">Events</NavLink>
                {user ? (
                    <Link className="NavLink" to="/profile">Profile</Link>
                ) : (
                    <Link className="NavLink" to="/login">Profile</Link>
                )}
                </div>
                {/* <div class="flex flex-1 items-center justify-end gap-x-6">
                    <Link className="signup" to="/signup">Sign Up</Link>
                </div> */}
                {user ? (
                    <div class="flex justify-between gap-x-6">
                        <p className="logout">Welcome, {user?.first_name}!</p>
                        <Link className="logoutbtn" to="/login" onClick={handleLogout}>Logout</Link>
                    </div>
                ) : (
                    <Link className="NavLogin" to="/login">Login</Link>
                )}
                <button onClick={handleNav} className='text-white block md:hidden'>
                    <SlMenu size={20}/>
                </button>
            </nav>
            <div className={nav ? 'text-white fixed left-0 top-0 w-[40%] h-full border-r border-stone-400 bg-slate-900 ease-in-out duration-500' : 'fixed left-[-100%]'}>
                <h1 className='w-full medium:text-xl text-2xl font-bold p-4'>
                    <NavLink exact to='/'>Lil Stinker's Club</NavLink>
                </h1>
                <ul >
                    <li className='p-4 border-b border-stone-400'>
                        <NavLink to='/profile'>Profile</NavLink>
                    </li>
                    <li className='p-4 border-b border-stone-400'>
                        <NavLink to='/venues'>Venues</NavLink>
                    </li>
                    <li className='p-4 border-b border-stone-400'>
                        <NavLink to='/events'>Events</NavLink>
                    </li>
                </ul>
            </div>
        </header>

    )
}
export default Navbar