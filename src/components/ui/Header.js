import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import './Header.css'

const Header = ({getSearch, SearchValue}) => {
    //Menu click for when screen size gets smaller
    const [MenuClick, setMenuClick] = useState(false)
    //checks if search button is clicked
    const [Button, setButton] = useState(true)

    const handleClick = () => setMenuClick(!MenuClick)
    const closeMenu = () => setMenuClick(false)

    //returns to main function to set the search click
    const handleSearch = () => {
        getSearch(!SearchValue)
    }

    const showButton = () => {
        if (window.innerWidth <= 960){
            setButton(false)
        }
        else{
            setButton(true)
        }
    }

    //only render once for show button 
    useEffect(() => {
        showButton();
      }, []);

    window.addEventListener('resize', showButton);

    return (
        <>
            <nav className='navbar'>
                <div className='navbar-container'>
                    <Link to='/' className='navbar-logo'>
                        Market Watch &nbsp;<i className='fa fa-area-chart' />
                    </Link>
                    <div className='menu-icon' onClick={handleClick}>
                        <i className={MenuClick ? 'fa fa-times' : 'fa fa-bars'} />
                    </div>
                    <ul className={MenuClick ? 'nav-menu active' : 'nav-menu'}>
                        <li className='nav-item'>
                            <Link to='/' className='nav-links' onClick={closeMenu}>
                                Watch List
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/Crypto' className='nav-links' onClick={closeMenu}>
                                Crypto
                            </Link>
                        </li>
                    </ul>
                    {Button && <button className='searchBtn' onClick={handleSearch} > SEARCH </button>}
                </div>
            </nav>
        </>
    )
}

export default Header
