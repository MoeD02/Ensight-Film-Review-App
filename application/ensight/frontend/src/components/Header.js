import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SideMenu from './SideMenu';
//import Login from './Login'; 
import '../assets/styles/components/Header.css';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    //const [isLoginModalOpen, setIsLoginModalOpen] = useState(false); 

    const navigate = useNavigate();

    const toggleMenu = () => {
        console.log("Menu toggled");
        setIsMenuOpen(!isMenuOpen);
    }
/*
    const handleLoginClick = () => {
        setIsLoginModalOpen(prevState => !prevState);
    };
*/
    const handleLogoClick = () => {
        window.location.href = '/';
    };

    const handleLoginClick = () => {
        window.location.href = '/LoginPage';
    };

    const handleSearchClick = () => {
        const inputElement = document.querySelector(".HeaderSearchInput");
        const searchTerm = inputElement.value.trim();
    
        if (searchTerm) {
            navigate(`/Browse?searchTerm=${searchTerm}`);
        } else {
            console.log("Input field is empty. Please enter a search term.");
        }
    };

    return (
        <>
        <div className="header">
            <button className="logo-button" onClick={handleLogoClick}>
                <span>ENSIGHT</span>
            </button>
            <div class="HeaderMovieSearch HeaderSearch">
                <input className="HeaderSearchInput HeaderInput" type="text" placeholder="Search" />
                <button class="HeaderSearchButton HeaderButton" onClick={handleSearchClick}>Search</button>
            </div>
            <div className="header-actions">
                <button className="menu-button" onClick={toggleMenu}>
                <div className="menu-icon">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                </button>
                <button className="profile-button" onClick={handleLoginClick}>Login</button>
            </div>
        </div>
        {isMenuOpen && <SideMenu isOpen={isMenuOpen} onClose={toggleMenu} />}
        </>
    );
}

export default Header;