import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decoded = jwtDecode(token);
            if (decoded.role === 'admin') {
                setIsAdmin(true);
            }
        }
    }, []);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const isLoggedIn = !!localStorage.getItem('token');

    // Navigation data array
    const navItems = [
        { id: 1, title: 'Home', link: '/' },
        isAdmin && { id: 2, title: 'Admin', link: '/admin' },
        !isAdmin && isLoggedIn && { id: 4, title: 'My Trips', link: '/history' }, // Added condition for "My Trips"
        { id: 3, title: 'Book a Ticket', link: '/bookinglist' },
    ].filter(Boolean);

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.reload(); // Reload the page to reflect the logout state
    };

    return (
        <header className="sticky font-poppins top-0 z-50 bg-white/80 backdrop-blur-lg">
            <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-12 py-4">
                <div className="flex items-center space-x-8">
                    <Link to="/" className="flex items-center space-x-2">
                        <img
                            src="../assets/train.png"
                            loading="lazy"
                            alt="Train Logo"
                            className="w-12 h-auto"
                        />
                        <div>
                            <span className="block text-xl font-bold text-red-500">Rail</span>
                            <span className="block text-xl font-bold text-red-500">Yatri</span>
                        </div>
                    </Link>
                </div>

                {/* Navigation links */}
                <ul className="flex items-center space-x-8 md:flex hidden">
                    {navItems.map(item => (
                        <li key={item.id} className="font-dm font-medium text-slate-700">
                            <Link to={item.link}>{item.title}</Link>
                        </li>
                    ))}
                </ul>
                <div className="flex items-center space-x-6">
                    {!isLoggedIn ? (
                        <>
                            <Link to="/signin" className="font-dm text-lg font-medium text-slate-700">
                                Sign in
                            </Link>
                            <Link
                                to="/signup"
                                className="rounded-md bg-gradient-to-br from-red-600 to-rose-400 px-3 py-1.5 font-dm text-lg font-medium text-white"
                            >
                                Signup
                            </Link>
                        </>
                    ) : (
                        <button onClick={handleLogout} className="font-dm text-lg font-medium text-slate-700">
                            Logout
                        </button>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden flex items-center">
                    <button type="button" onClick={toggleMenu} className="px-4 py-3 bg-red-600 rounded-md text-white outline-none focus:ring-4 shadow-lg transform active:scale-75 transition-transform">
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-md">
                    <ul className="flex flex-col items-center py-4">
                        {navItems.map(item => (
                            <li key={item.id} className="py-2 text-2xl font-medium text-slate-700">
                                <Link to={item.link}>{item.title}</Link>
                            </li>
                        ))}
                    </ul>
                    {!isLoggedIn ? (
                        <div className="flex justify-center py-4">
                            <Link to="/signin" className="font-dm text-lg font-medium text-slate-700 px-4 py-2">
                                Sign in
                            </Link>
                            <Link to="/signup" className="rounded-md bg-gradient-to-br from-red-600 to-rose-400 px-4 py-2 font-dm text-lg font-medium text-white">
                                Signup
                            </Link>
                        </div>
                    ) : (
                        <div className="flex justify-center py-4">
                            <button onClick={handleLogout} className="font-dm text-lg font-medium text-slate-700 px-4 py-2">
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            )}
        </header>
    );
};

export default Navbar;