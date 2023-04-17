import React from 'react'
import {NavLink} from 'react-router-dom'
import './index.css';


function Navbar() {

    return(
        <nav classname="nav">
            <NavLink className="NavLink" exact to = "./">Home</NavLink>
            <NavLink className="NavLink" to = "/venues">Venues</NavLink>
            <NavLink className="NavLink" to = "/tickets">Tickets</NavLink>
        </nav>
    )
}
export default Navbar