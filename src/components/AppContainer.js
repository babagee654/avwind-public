import React from 'react';
import Navbar from './navbar/Navbar';
import { Outlet } from 'react-router-dom'
import Footer from './footer/Footer';
import MobileMenu from './navbar/MobileMenu';



export default function AppContainer() {


    const [showMenu, setShowMenu] = React.useState(false);

    function toggleMenu() {
        setShowMenu(prevShowMenu => !prevShowMenu)
    }

    return (
        <div className='app-container'>
            <Navbar
                toggleMenu={toggleMenu}
            />
            <MobileMenu
                showMenu={showMenu}
            />
            <Outlet />
            <Footer />
        </div>
    );
}