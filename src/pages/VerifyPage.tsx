import { useEffect, useState, useCallback } from 'react';
import VerifyForm from '../components/VerifyForm';
import { verifyOtpService } from '../ApiService/VerifyOtpService';
import { useLocation, useNavigate } from 'react-router-dom';
import { resendOtpService } from '../ApiService/ResendOtpService';
import toast from 'react-hot-toast';
import { getUserDetailsService } from '../ApiService/UserDetailsService';

const VerifyPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [otp, setOtp] = useState<string>('');
    const [isVerifying, setIsVerifying] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');

    const fetchUserEmail = useCallback(() => {
        if (!location.state || !location.state.email) {
            toast.error('User not authorized!');
            navigate('/');
            return;
        }
        const { email } = location.state as { email: string };
        setEmail(email);
    }, [location.state, navigate]);

    useEffect(() => {
        fetchUserEmail();
    }, [fetchUserEmail]);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const user_details = await getUserDetailsService();
                if (user_details) {
                    toast.success('User is already logged in.');
                    navigate('/');
                    return;
                }
            } catch (error: any) {}
        };
        fetchUserDetails();
    }, [navigate]);

    const handleVerifySubmit = async (otp: string) => {
        console.log('OTP Submitted:', otp);
        const userPayload = { otp, email };

        try {
            await verifyOtpService(userPayload);
            toast.success(
                'OTP Verified Successfully! Login to your account...'
            );
            navigate(`/login`);
        } catch (error: any) {
            toast.error(
                error.message || 'Something went wrong. Please try again.'
            );
        }
    };

    const handleOtpChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number
    ) => {
        const value = e.target.value;
        if (/[^a-zA-Z0-9]/.test(value)) return;
        const otpArray = otp.split('');
        otpArray[index] = value;
        setOtp(otpArray.join(''));
    };

    const resendOtp = async () => {
        console.log('Resending OTP...');
        const userPayload = { email };

        try {
            await resendOtpService(userPayload);
            toast.success('OTP Resent Successfully!');
        } catch (error: any) {
            toast.error(
                error.message || 'Failed to resend OTP. Please try again.'
            );
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsVerifying(true);
        await handleVerifySubmit(otp);
        setIsVerifying(false);
    };

    return (
        <div className="h-full w-full py-10">
            <VerifyForm
                otp={otp}
                handleOtpChange={handleOtpChange}
                handleSubmit={handleSubmit}
                resendOtp={resendOtp}
                isLoggingIn={isVerifying}
            />
        </div>
    );
};

export default VerifyPage;
