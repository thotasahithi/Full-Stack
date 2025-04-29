import React from 'react';
import '../App.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p>&copy; {new Date().getFullYear()} Movie Bluff. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;