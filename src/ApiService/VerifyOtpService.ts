import axios from 'axios';
import { verifyDto } from '../DTO/dto';
import toast from 'react-hot-toast';

export const verifyOtpService = async (userPayload: verifyDto) => {
    try {
        const response = await axios.post(
            'http://localhost:3000/auth/verify_otp',
            userPayload
        );
        return response.data;
    } catch (error: any) {
        if (error.response && error.response.data) {
            const errorMessage =
                error.response.data.message ||
                'An unknown error occurred during OTP verification.';
            console.error('OTP verification failed:', errorMessage);
            toast.error(errorMessage);
            throw new Error(errorMessage);
        }

        console.error('OTP verification failed:', error.message);
        const message = 'Network or server issue. Please try again later.';
        toast.error(message);
        throw new Error(message);
    }
};
