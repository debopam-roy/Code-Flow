import axios from 'axios';
import { resendDto } from '../DTO/dto';
import toast from 'react-hot-toast';

export const resendOtpService = async (userPayload: resendDto) => {
    try {
        const response = await axios.post(
            'http://localhost:3000/auth/send_otp',
            userPayload
        );
        return response.data;
    } catch (error: any) {
        if (error.response && error.response.data) {
            const errorMessage =
                error.response.data.message ||
                'An unknown error occurred during OTP resending.';
            console.error('OTP resend failed:', errorMessage);
            toast.error(errorMessage);
            throw new Error(errorMessage);
        }

        console.error('OTP resend failed:', error.message);
        const message = 'Network or server issue. Please try again later.';
        toast.error(message);
        throw new Error(message);
    }
};
