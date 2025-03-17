import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import LoginForm from '../components/LoginForm';
import { loginService } from '../ApiService/LoginService';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { getUserDetailsService } from '../ApiService/UserDetailsService';

const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const user_details = await getUserDetailsService();
                if (user_details) {
                    toast.success('User is already logged in.');
                    navigate('/');
                }
            } catch (error: any) {}
        };
        fetchUserDetails();
    }, [navigate]);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoggingIn(true);
        try {
            await handleFormSubmit(email, password);
            toast.success('Logged in successfully!');
            navigate('/');
        } catch (error) {
            toast.error('Login failed. Please try again.');
        } finally {
            setIsLoggingIn(false);
        }
    };

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleFormSubmit = async (email: string, password: string) => {
        const userpayload = { email, password };
        await loginService(userpayload);
        setEmail('');
        setPassword('');
    };

    return (
        <div className="h-full w-full py-10">
            <LoginForm
                email={email}
                password={password}
                isLoggingIn={isLoggingIn}
                showPassword={showPassword}
                togglePasswordVisibility={togglePasswordVisibility}
                handleSubmit={handleSubmit}
                handleEmailChange={handleEmailChange}
                handlePasswordChange={handlePasswordChange}
            />
        </div>
    );
};

export default LoginPage;
