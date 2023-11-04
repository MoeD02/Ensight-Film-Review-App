import React from 'react';
import '../assets/styles/components/SideMenu.css';

const SideMenu = ({ isOpen, onClose }) => {
    return (
        <div className='Menu'>
            <div className={`side-menu-slide ${isOpen ? 'menu-open' : ''}`}>
                <button className="close-button" onClick={onClose}>X</button>
                <h2>Menu</h2>
                <ul>
                <li>Profile</li>
                <li>Explore</li>
                <li>Lists</li>
                <li>Feed</li>
                <li>Insight</li>
                <li>Diary</li>
                <li>Watchlist</li>
                <li>About</li>
                <li>Settings</li>
                <li>Sign out</li>
                </ul>
            </div>
        </div>
    );
}


export default SideMenu;