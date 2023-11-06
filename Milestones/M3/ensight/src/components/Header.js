import React, { useState } from 'react';
import SideMenu from './SideMenu';
import Login from './Login'; 
import '../assets/styles/components/Header.css';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false); 

    const toggleMenu = () => {
        console.log("Menu toggled");
        setIsMenuOpen(!isMenuOpen);
    }

    const handleLoginClick = () => {
        setIsLoginModalOpen(prevState => !prevState);
    };

    const handleLogoClick = () => {
        window.location.href = '/';
    };

    return (
        <>
        <div className="header">
            <button className="logo-button" onClick={handleLogoClick}>
                <span>ENSIGHT</span>
            </button>
            <div class="HeaderMovieSearch HeaderSearch">
                <input className="HeaderSearchInput HeaderInput" type="text" placeholder="Add Item" />
                <button class="HeaderSearchButton HeaderButton">Search</button>
            </div>
            <div className="header-actions">
                <button className="menu-button" onClick={toggleMenu}>
                <div className="menu-icon">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                </button>
                <button className="profile-button" onClick={() => setIsLoginModalOpen(prevState => !prevState)}>Login</button>
            </div>
        </div>
        {isMenuOpen && <SideMenu isOpen={isMenuOpen} onClose={toggleMenu} />}
        {isLoginModalOpen && <Login onClose={handleLoginClick} />} 
        </>
    );
}

export default Header;