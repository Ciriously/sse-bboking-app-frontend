import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    // Navigation data array
    const navItems = [
        { id: 1, title: 'Home', link: '#' },
        { id: 2, title: 'Gallery', link: '#' },
        { id: 3, title: 'Contact', link: '#' },
        { id: 4, title: 'About', link: '#' }
    ];

    return (
        <header className="sticky  font-poppins top-0 z-50 bg-white/80 backdrop-blur-lg">
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
                            <a href={item.link}>{item.title}</a>
                        </li>
                    ))}
                </ul>

                <div className="flex items-center space-x-6 md:flex hidden">
                    <Link to="/signin" className="font-dm text-lg font-medium text-slate-700">
                        Sign in
                    </Link>
                    <Link
                        to="/signup"
                        className="rounded-md bg-gradient-to-br from-green-600 to-emerald-400 px-3 py-1.5 font-dm text-lg font-medium text-white shadow-md shadow-green-400/50 transition-transform duration-200 ease-in-out hover:scale-[1.03]"
                    >
                        Signup
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden flex items-center">
                    <button type="button" onClick={toggleMenu}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            aria-hidden="true"
                            className="h-6 w-auto text-slate-900"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4 6h16M4 12h16m-7 6h7"
                            />
                        </svg>
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-md">
                    <ul className="flex flex-co items-center py-4">
                        {navItems.map(item => (
                            <li key={item.id} className="py-2 text-2xl font-medium text-slate-700">
                                <a href={item.link}>{item.title}</a>
                            </li>
                        ))}
                    </ul>
                    <div className="flex justify-center py-4">
                        <Link
                            to="/signin"
                            className="font-dm text-lg font-medium text-slate-700 px-4 py-2"
                        >
                            Sign in
                        </Link>
                        <Link
                            to="/signup"
                            className="rounded-md bg-gradient-to-br from-green-600 to-emerald-400 px-4 py-2 font-dm text-lg font-medium text-white shadow-md shadow-green-400/50 transition-transform duration-200 ease-in-out hover:scale-[1.03]"
                        >
                            Signup
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;
