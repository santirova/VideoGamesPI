import React from 'react'
import { Link, useLocation } from 'react-router-dom'

import './Navbar.module.css'

export const Navbar = () => {
    const location = useLocation()
    return (
        <nav>
            <div>
                <h2>VideoGames PI</h2>
            </div>
            <div>
                <Link to='/home' className={location.pathname === '/home' ? 'active' : ''}>HOME</Link>
                <Link to='/form' className={location.pathname === '/form' ? 'active' : ''}>FORM</Link>
            </div>
            {location.pathname === '/home' && 
            <div>
                <input type='search' placeholder='Search' />
                <button>GO</button>
            </div>}
        </nav>
    )
}