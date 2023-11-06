import React from 'react';
import "../assets/styles/components/FooterComponent.css"

const FooterComponent = () => {
    return (
        <footer className="footer">
            <div className="footer-menu">
                <a href="/profile">Profile</a>
                <a href="/feed">Feed</a>
                <a href="/watchlist">Watch List</a>
                <a href="/explore">Explore</a>
                <a href="/statistics">Statistics</a>
                <a href="/settings">Settings</a>
                <a href="/lists">Lists</a>
                <a href="/diary">Diary</a>
            </div>
            <div className="footer-brand">
                <span>ENSIGHT</span>
                <span>© 2023 Ensight Inc.</span>
            </div>
        </footer>
    );
}

export default FooterComponent;