import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SideMenu from "./SideMenu";
import Login from "./Login";
import "../assets/styles/components/Header.css";

const Header = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	// const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
	const [authToken, setAuthToken] = useState("");

	useEffect(() => {
		const token = localStorage.getItem("Authorization");
		if (token) {
			setAuthToken(token);
			console.log("has auth");
		} else {
			console.log("no auth");
		}
	}, []);

	const navigate = useNavigate();

	const toggleMenu = () => {
		console.log("Menu toggled");
		setIsMenuOpen(!isMenuOpen);
	};

	const handleLoginClick = () => {
		// setIsLoginModalOpen(prevState => !prevState);
		window.location.href = "/LoginPage";
	};

	const handleLogoutClick = async (e) => {
		e.preventDefault();
		const logoutEndpoint = "http://127.0.0.1:8000/accounts/logout";
		const headers = {
			"Content-Type": "application/json",
			Authorization: authToken,
		};
		try {
			const response = await fetch(logoutEndpoint, {
				method: "POST",
				headers: headers,
			});
			if (response.status === 204) {
				localStorage.removeItem("Authorization");
				window.location.href = "/";
			} else {
				throw new Error("Logout failed");
			}
		} catch (error) {
			console.error("Logout error: ", error);
		}
	};

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
				<div class="HeaderMovieSearch HeaderSearch">
					<input
						className="HeaderSearchInput HeaderInput"
						type="text"
						placeholder="Search"
					/>
					<button
						class="HeaderSearchButton HeaderButton"
						onClick={handleSearchClick}>
						Search
					</button>
				</div>
				<div className="header-actions">
					<button className="menu-button" onClick={toggleMenu}>
						<div className="menu-icon">
							<div></div>
							<div></div>
							<div></div>
						</div>
					</button>
					{authToken ? (
						<button className="profile-button" onClick={handleLogoutClick}>
							Logout
						</button>
					) : (
						<button className="profile-button" onClick={handleLoginClick}>
							Login
						</button>
					)}
				</div>
			</div>
			{isMenuOpen && <SideMenu isOpen={isMenuOpen} onClose={toggleMenu} />}
			{/* {isLoginModalOpen && <Login onClose={handleLoginClick} />}  */}
		</>
	);
};

export default Header;
