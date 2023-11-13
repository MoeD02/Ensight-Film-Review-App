import React from 'react';
import '../assets/styles/components/SideMenu.css';
import { Link } from 'react-router-dom';

const SideMenu = ({ isOpen, onClose }) => {
    return (
        <div className='Menu'>
            <div className={`side-menu-slide ${isOpen ? 'menu-open' : ''}`}>
                <button className="close-button" onClick={onClose}>X</button>
                <h2>Menu</h2>
                <ul className='MenuLinks'>
                    <li><Link to="/Profile" onClick={onClose}>Profile</Link></li>
                    <li><Link to="/Browse" onClick={onClose}>Explore</Link></li>
                    <li><Link to="/DisplayList" onClick={onClose}>Lists</Link></li>
                    <li><Link to="/DisplayMovie" onClick={onClose}>Movies</Link></li>
                    <li><Link to="/DisplayUser" onClick={onClose}>Members</Link></li>
                    <li><Link to="/Feed" onClick={onClose}>Feed</Link></li>
                    <li><Link to="/Profile" onClick={onClose}>Insight</Link></li>
                    {/* <li><Link to="/Profile" onClick={onClose}>Diary</Link></li> */}
                    <li><Link to="/Profile" onClick={onClose}>Watchlist</Link></li>
                    {/* <li><Link to="../pages/Profile" onClick={onClose}>About</Link></li> */}
                    {/* <li><Link to="../pages/Profile" onClick={onClose}>Settings</Link></li> */}
                    {/* If Sign out is a function, it should be handled differently */}
                    <li onClick={onClose}>Sign out</li>
                </ul>
            </div>
        </div>
    );
}

export default SideMenu;