import React from 'react';
import '../assets/styles/components/SideMenu.css';
import { Link } from 'react-router-dom';
import { getCurrentUser } from '../APIcalls';
import { useEffect, useState } from "react";

const SideMenu = ({ isOpen, onClose }) => {
    const [authToken, setAuthToken] = useState('');
    const [currentUser, setCurrentUser]=useState('');
    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('Authorization');
            if (token) {
                setAuthToken(token);
                try {
                    const userData = await getCurrentUser(token);
                    setCurrentUser(userData);
                } catch (error) {
                    console.error('Failed to fetch user data', error);
                }
            } else {
                console.log('no auth');
            }
        };

        fetchData();
    }, []);
    
    if(authToken){
        
        
        return (
            <div className='Menu'>
                <div className={`side-menu-slide ${isOpen ? 'menu-open' : ''}`}>
                    <button className="close-button" onClick={onClose}>X</button>
                    <h2>Menu</h2>
                    <ul className='MenuLinks'>
                        <li><Link to={`/Profile/${currentUser["id"]}/profile`} onClick={onClose}>Profile</Link></li>
                        <li><Link to="/Browse" onClick={onClose}>Explore</Link></li>
                        <li><Link to="/DisplayList" onClick={onClose}>Lists</Link></li>
                        <li><Link to="/DisplayMovie" onClick={onClose}>Movies</Link></li>
                        <li><Link to="/DisplayUser" onClick={onClose}>Members</Link></li>
                        <li><Link to="/Feed" onClick={onClose}>Feed</Link></li>
                        <li><Link to="/Profile/insight" onClick={onClose}>Insight</Link></li>
                        {/* <li><Link to="/Profile" onClick={onClose}>Diary</Link></li> */}
                        <li><Link to="/Profile/watchlist" onClick={onClose}>Watchlist</Link></li>
                        <li><Link to="/About" onClick={onClose}>About</Link></li>
                        {/* <li><Link to="../pages/Profile" onClick={onClose}>Settings</Link></li> */}
                        {/* If Sign out is a function, it should be handled differently */}
                        
                    </ul>
                </div>
            </div>
        );
    }else{
        return (
            <div className='Menu'>
                <div className={`side-menu-slide ${isOpen ? 'menu-open' : ''}`}>
                    <button className="close-button" onClick={onClose}>X</button>
                    <h2>Menu</h2>
                    <ul className='MenuLinks'>
                       
                        <li><Link to="/Browse" onClick={onClose}>Explore</Link></li>
                        <li><Link to="/DisplayList" onClick={onClose}>Lists</Link></li>
                        <li><Link to="/DisplayMovie" onClick={onClose}>Movies</Link></li>
                        <li><Link to="/DisplayUser" onClick={onClose}>Members</Link></li>
                        <li><Link to="/Feed" onClick={onClose}>Feed</Link></li>
                        
                        {/* <li><Link to="/Profile" onClick={onClose}>Diary</Link></li> */}
                        
                        <li><Link to="/About" onClick={onClose}>About</Link></li>
                        {/* <li><Link to="../pages/Profile" onClick={onClose}>Settings</Link></li> */}
                        {/* If Sign out is a function, it should be handled differently */}
                        
                    </ul>
                </div>
            </div>
        );
    }
}

export default SideMenu;