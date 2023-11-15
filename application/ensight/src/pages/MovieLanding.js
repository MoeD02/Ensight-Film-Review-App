import React, { useState } from "react";
import '../assets/styles/pages/MovieLanding.css';
/* import Header from "../components/Header"; */
import FooterComponent from "../components/FooterComponent";

import SideMenu from '../components/SideMenu.js';
import Login from '../components/Login.js'; // Import the Login component
import '../assets/styles/components/Header.css';

const MovieLanding = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false); // Renamed this state

    const toggleMenu = () => {
        console.log("Menu toggled");
        setIsMenuOpen(!isMenuOpen);
    }

  return (
    <div className="MovieLanding">
        <div className="TheHeader">
        <div className="header">
            <button className="logo-button" onClick={() => window.location.href = '/'}>
                <span>ENSIGHT</span>
            </button>
            <div class="MovieSearch HeaderSearch">
                <input className="SearchInput HeaderInput" type="text" placeholder="Add Item" />
                <button class="SearchButton HeaderButton">Search</button>
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
        {isLoginModalOpen && <Login />} {/* Using Login instead of LoginModal */}
        </div>
        <div className="MovieHorizontalPoster">

        </div>
        <div className="something">
            <h3>Hi</h3>
        </div>
        <FooterComponent />
    </div>
  );
}

export default MovieLanding;
