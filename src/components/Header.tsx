import React from "react";

const Header = () => {
    return (
        <header>
            <div className="header-container flex justify-between items-center p-4">
                <div style={{ fontWeight: "bold" }}>Radiant Violet</div>
                <div style={{ fontSize: "0.9rem" }}>Login</div>
            </div>
        </header>
    );
};

export default Header;