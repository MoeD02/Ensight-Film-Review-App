import React, { useState } from 'react';
import SideMenu from './SideMenu';
import Login from './Login'; // Import the Login component
import '../assets/styles/components/Header.css';


const Header = () => {
const [isMenuOpen, setIsMenuOpen] = useState(false);
const [isLoginModalOpen, setIsLoginModalOpen] = useState(false); // Renamed this state


const toggleMenu = () => {
console.log("Menu toggled");
setIsMenuOpen(!isMenuOpen);
}


return (
<>
<div className="header">
<button className="logo-button" onClick={() => window.location.href = '/'}>
<span>ENSIGHT</span>
</button>
<div className="search-bar">
<input type="text" placeholder="Search Anything" />
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
</>
);
}


export default Header;