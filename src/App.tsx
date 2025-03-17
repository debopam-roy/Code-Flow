import { Toaster } from 'react-hot-toast';
import LoginPage from './pages/LoginPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import JoinPage from './pages/JoinPage';
import Navbar from './components/Navbar';
import CreatePage from './pages/CreatePage';
import VerifyPage from './pages/VerifyPage';
import DashboardPage from './pages/DashboardPage';
import { useEffect, useState } from 'react';
import ProjectPage from './pages/ProjectPage';

const App = () => {
    const [theme, setTheme] = useState<string>('light');

    useEffect(() => {
        const isDarkMode = document.documentElement.classList.contains('dark');
        setTheme(isDarkMode ? 'dark' : 'light');

        const observer = new MutationObserver(() => {
            const isDarkModeNow =
                document.documentElement.classList.contains('dark');
            setTheme(isDarkModeNow ? 'dark' : 'light');
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class'],
        });

        return () => observer.disconnect();
    }, []);

    return (
        <div className="font-nunito bg-backgroundColor-light dark:bg-backgroundColor-dark">
            <div>
                <Toaster
                    position="top-right"
                    toastOptions={{
                        success: {
                            style: {
                                background:
                                    theme === 'dark' ? '#2F2F2F' : '#F0F0F0',
                                color: theme === 'dark' ? '#F5F5F5' : '#000000',
                            },
                            iconTheme: {
                                primary: '#22C55E',
                                secondary: '#FFFFFF',
                            },
                        },
                        error: {
                            style: {
                                background:
                                    theme === 'dark' ? '#2F2F2F' : '#F0F0F0',
                                color: theme === 'dark' ? '#F5F5F5' : '#000000',
                            },
                            iconTheme: {
                                primary: '#EF4444',
                                secondary: '#FFFFFF',
                            },
                        },
                    }}
                />
            </div>
            <Router>
                <div className="h-screen flex flex-col bg-backgroundColor-light dark:bg-backgroundColor-dark text-textColor-dark dark:text-textColor-light font-poppins">
                    <Navbar />

                    <div className="flex-auto overflow-auto">
                        <Routes>
                            <Route path="/" element={<JoinPage />} />
                            <Route
                                path="/register"
                                element={<RegisterPage />}
                            />
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/verify" element={<VerifyPage />} />
                            <Route path="/create/0" element={<CreatePage />} />
                            <Route path="/create/1" element={<ProjectPage />} />
                            <Route
                                path="/editor/:roomId"
                                element={<DashboardPage />}
                            />
                        </Routes>
                    </div>
                </div>
            </Router>
        </div>
    );
};

export default App;
