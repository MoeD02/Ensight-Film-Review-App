import React from "react";
import { Link } from "react-router-dom";
import "../assets/styles/components/FooterComponent.css";

const FooterComponent = () => {
	return (
		<footer className="footer">
			<div className="footer-menu">
				<Link to="/">Home</Link>
				<Link to="/Profile/profile">Profile</Link>
				<Link to="/Feed">Feed</Link>
				<Link to="/Profile/watchlist">Watchlist</Link>
				<Link to="/Browse">Explore</Link>
				<Link to="/DisplayList">Lists</Link>
				<Link to="/DisplayMovie">Movies</Link>
				<Link to="/DisplayUser">Members</Link>
				<Link to="/Profile/insight">Insights</Link>
				{/* <Link to="/settings">Settings</Link> */}
				<Link to="/Profile/diary">Diary</Link>
				<Link to="/About">About</Link>
			</div>
			<div className="footer-brand">
				<span>ENSIGHT</span>
				<span>© 2023 Ensight Inc.</span>
			</div>
		</footer>
	);
};

export default FooterComponent;
