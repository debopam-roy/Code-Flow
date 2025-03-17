import React, { useState } from 'react';
import { GoSun, GoMoon } from 'react-icons/go';
import logo from '/assets/logo.png';

const Navbar: React.FC = () => {
    const [darkMode, setDarkMode] = useState(false);

    const toggleTheme = () => {
        setDarkMode(!darkMode);
        if (darkMode) {
            document.documentElement.classList.remove('dark');
        } else {
            document.documentElement.classList.add('dark');
        }
    };

    return (
        <nav className="bg-cardBackgroundColor-light dark:bg-cardBackgroundColor-dark shadow-xl z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex-shrink-0">
                        <a
                            href="/"
                            className="text-xl font-bold text-gray-800 dark:text-gray-200"
                        >
                            <img
                                src={logo}
                                alt="Logo"
                                className="h-10 w-auto"
                            />
                        </a>
                    </div>

                    {/* Theme Toggle Button */}
                    <div className="flex items-center">
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 dark:focus:ring-gray-600"
                        >
                            {darkMode ? <GoSun /> : <GoMoon />}
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
