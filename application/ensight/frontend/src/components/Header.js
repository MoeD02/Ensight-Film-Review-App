import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SideMenu from './SideMenu';
import Login from './Login'; 
import '../assets/styles/components/Header.css';
import { getCurrentUser } from '../APIcalls';
const initUser = async () => {
    let token = localStorage.getItem('Authorization');
    if(token) {
        const user = await getCurrentUser(token);
        if(user != null) {
            return {
                name: user.username,
                id: user.id,
                token: token,
            }
        }
        else {
            // remove expired token
            localStorage.removeItem('Authorization');
        }
    }
    return null;
}
const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    // const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const loadUser = async () => {
            let userInfo = await initUser();
            setUser(userInfo);
        }
        loadUser();
    }, []);

	const navigate = useNavigate();

	const toggleMenu = () => {
		console.log("Menu toggled");
		setIsMenuOpen(!isMenuOpen);
	};

    const handleLoginClick = () => {
        // setIsLoginModalOpen(prevState => !prevState);
        window.location.href = '/LoginPage'
    };
    
    const handleLogoutClick = async (e) => {
        e.preventDefault();
        const logoutEndpoint = 'http://127.0.0.1:8000/accounts/logout'
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': user.token,
        };
        try {
            const response = await fetch(logoutEndpoint, {
                method: 'POST',
                headers: headers,
            });
            if(response.status === 204) {
                localStorage.removeItem('Authorization');
                window.location.href = '/';
            } else {
                throw new Error('Logout failed');
            }
        } catch (error) {
            console.error('Logout error: ', error);
        }
    }

	const handleLogoClick = () => {
		window.location.href = "/";
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

    // if(authToken) {
        return (
            <>
            <div className="header">
                <button className="logo-button" onClick={handleLogoClick}>
                    <span>ENSIGHT</span>
                </button>
                <div className="HeaderMovieSearch HeaderSearch">
                    <input className="HeaderSearchInput HeaderInput" type="text" placeholder="Search" />
                    <button className="HeaderSearchButton HeaderButton" onClick={handleSearchClick}>Search</button>
                </div>
                <div className="header-actions">
                    <button className="menu-button" onClick={toggleMenu}>
                    <div className="menu-icon">
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    </button>
                    {!!user && user.token
                        ? <button className="profile-button" onClick={handleLogoutClick}>Logout</button>
                        : <button className="profile-button" onClick={handleLoginClick}>Login</button>
                    }
                </div>
            </div>
            {isMenuOpen && <SideMenu isOpen={isMenuOpen} onClose={toggleMenu} />}
            {/* {isLoginModalOpen && <Login onClose={handleLoginClick} />}  */}
            </>
        );
    
}

export default Header;
