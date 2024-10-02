/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="bg-blue-900 text-white shadow-md">
            <div className="container mx-auto flex justify-between items-center p-4">
                <div className="text-xl font-bold flex items-center">
                    <Link to="/" className='font-bold'>Online Medical Store</Link>
                </div>
                <nav className="flex space-x-4">
                    <Link to="/" className="hover:text-blue-300">Home</Link>
                    <Link to="/about" className="hover:text-blue-300">About Us</Link>
                    <Link to="/login" className="hover:text-blue-300">Sign In / Log In</Link>
                </nav>
            </div>
        </header>
    );
};

export default Header;
