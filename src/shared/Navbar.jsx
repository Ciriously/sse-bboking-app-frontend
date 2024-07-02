import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAdminCheck from '../hooks/useAdminCheck';
import useToggle from '../hooks/useToggle';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const [isOpen, toggleMenu] = useToggle(false);
    const isAdmin = useAdminCheck();
    const { user, signout } = useAuth();

    const [navItems, setNavItems] = useState([]);

    useEffect(() => {
        console.log("useEffect triggered with isAdmin:", isAdmin, "and user:", user); // Log the states
        const updatedNavItems = [
            { id: 1, title: 'Home', link: '/', isUser: true, isAdmin: true },
            isAdmin ? { id: 2, title: 'Admin', link: '/admin', isUser: false, isAdmin: true } : null,
            user ? { id: 4, title: 'My Trips', link: '/history', isUser: true, isAdmin: false } : null,
            { id: 3, title: 'Book a Ticket', link: '/bookinglist', isUser: true, isAdmin: true },
        ].filter(Boolean);

        setNavItems(updatedNavItems);
        console.log("Updated nav items:", updatedNavItems); // Log updated nav items
    }, [isAdmin, user]);

    const handleLogout = () => {
        console.log("Logging out");
        signout();
    };

    return (
        <header className="sticky font-poppins top-0 z-50 bg-white/80 backdrop-blur-lg">
            <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-2 py-4">
                <div className="flex items-center space-x-8">
                    <Link to="/" className="flex items-center space-x-2">
                        <img
                            src="../assets/train.png"
                            loading="lazy"
                            alt="Train Logo"
                            className="w-16 mr-4 h-auto"
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
                        <li key={item.id} className="text-lg font-medium  text-slate-700">
                            <Link to={item.link}>{item.title}</Link>
                        </li>
                    ))}
                </ul>
                <div className="flex items-center space-x-6 md:flex hidden">
                    {!user ? (
                        <>
                            <Link to="/signin" className="font-dm text-xl font-medium text-slate-700">
                                Sign in
                            </Link>
                            <Link
                                to="/signup"
                                className="rounded-md bg-gradient-to-br from-red-600 to-rose-400 px-3 py-1.5 font-dm text-xl font-medium text-white"
                            >
                                Signup
                            </Link>
                        </>
                    ) : (
                        <button onClick={handleLogout} className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-xl px-8 py-3.5 text-center mr-2 mb-2">
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
                    {!user ? (
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
                            <button onClick={handleLogout} className="text-white font-bold bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:ring-red-300 dark:focus:ring-red-800  rounded-lg text-sm px-3 py-2.5 text-center mr-2 mb-2">
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
