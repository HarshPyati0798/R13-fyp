import React from 'react';
import '../styles/HeaderStyles.css';

const Header = () => (
    <nav className="HeaderDiv">
        <p>Nirgun</p>
        <ul className="navoptions">
            <li>Home</li>
            <li>Features</li>
            <li>Pricing</li>
            <li>About</li>
        </ul>
    </nav>
);

export default Header;