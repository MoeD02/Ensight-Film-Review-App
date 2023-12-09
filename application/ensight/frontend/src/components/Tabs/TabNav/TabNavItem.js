import React from "react";

const TabNavItem = ({ id, title, activeTab, setActiveTab, onClick }) => {
    const handleClick = () => {
        setActiveTab(id);
        if (onClick) {
            onClick(); // Trigger additional onClick function if provided
        }
    };
    
    return (
        <li onClick={handleClick} className={activeTab === id ? "active" : ""}>{ title }</li>
    );
};

export default TabNavItem;
