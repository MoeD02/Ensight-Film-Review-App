import React, { useState, useEffect } from "react";
import "../assets/styles/components/SideMenu.css";
import { Link, useLocation } from "react-router-dom";
import { getCurrentUser } from "../APIcalls";

const SideMenu = ({ isOpen, onClose }) => {
	const [authToken, setAuthToken] = useState("");
	const [currentUser, setCurrentUser] = useState("");
	const location = useLocation(); // React Router's useLocation hook

	useEffect(() => {
		const fetchData = async () => {
			const token = localStorage.getItem("Authorization");
			if (token) {
				setAuthToken(token);
				try {
					const userData = await getCurrentUser(token);
					setCurrentUser(userData);
				} catch (error) {
					console.error("Failed to fetch user data", error);
				}
			} else {
				console.log("no auth");
			}
		};

		fetchData();
	}, [location.pathname]); // Fetch data when the route changes

	if (authToken) {
		return (
			<div className="Menu">
				<div className={`side-menu-slide ${isOpen ? "menu-open" : ""}`}>
					<button className="close-button" onClick={onClose}>
						X
					</button>
					<h2>Menu</h2>
					<ul className="MenuLinks">
						<li>
							<Link
								to={`/Profile/${currentUser["id"]}/profile`}
								onClick={onClose}>
								Profile
							</Link>
						</li>
						<li>
							<Link to="/Browse" onClick={onClose}>
								Explore
							</Link>
						</li>
						<li>
							<Link to="/DisplayList" onClick={onClose}>
								Lists
							</Link>
						</li>
						{/* <li>
							<Link to="/DisplayMovie" onClick={onClose}>
								Movies
							</Link>
						</li> */}
						<li>
							<Link to="/DisplayUser" onClick={onClose}>
								Members
							</Link>
						</li>
						<li>
							<Link to="/Feed" onClick={onClose}>
								Feed
							</Link>
						</li>
						<li>
							<Link to="/Profile/insight" onClick={onClose}>
								Insight
							</Link>
						</li>
						<li>
							<Link
								to={`/Profile/${currentUser["id"]}/watchlist`}
								onClick={onClose}>
								Watchlist
							</Link>
						</li>
						<li>
							<Link to="/About" onClick={onClose}>
								About
							</Link>
						</li>
					</ul>
				</div>
			</div>
		);
	} else {
		return (
			<div className="Menu">
				<div className={`side-menu-slide ${isOpen ? "menu-open" : ""}`}>
					<button className="close-button" onClick={onClose}>
						X
					</button>
					<h2>Menu</h2>
					<ul className="MenuLinks">
						<li>
							<Link to="/Browse" onClick={onClose}>
								Explore
							</Link>
						</li>
						<li>
							<Link to="/DisplayList" onClick={onClose}>
								Lists
							</Link>
						</li>
						{/* <li>
							<Link to="/DisplayMovie" onClick={onClose}>
								Movies
							</Link>
						</li> */}
						<li>
							<Link to="/DisplayUser" onClick={onClose}>
								Members
							</Link>
						</li>
						<li>
							<Link to="/Feed" onClick={onClose}>
								Feed
							</Link>
						</li>
						<li>
							<Link to="/About" onClick={onClose}>
								About
							</Link>
						</li>
					</ul>
				</div>
			</div>
		);
	}
};

export default SideMenu;
