import axios from 'axios';
import { loginDto } from '../DTO/dto';
import toast from 'react-hot-toast';

export const loginService = async (userPayload: loginDto) => {
    try {
        const response = await axios.post(
            'http://localhost:3000/auth/login',
            userPayload,
            {
                withCredentials: true,
            }
        );
        return response.data;
    } catch (error: any) {
        let errorMessage =
            'An unexpected error occurred. Please try again later.';

        if (error.response) {
            // Handle errors from the server
            if (error.response.status === 400) {
                errorMessage =
                    'Invalid credentials. Please check your email and password.';
            } else if (error.response.status === 500) {
                errorMessage = 'Internal server error. Please try again later.';
            } else if (error.response.data && error.response.data.message) {
                errorMessage = error.response.data.message;
            }
        } else if (error.request) {
            // Network error
            errorMessage =
                'Network issue. Please check your connection and try again.';
        } else {
            // Other errors
            errorMessage = `Error: ${error.message}`;
        }

        console.error('Login failed:', errorMessage);
        toast.error(errorMessage);
        throw new Error(errorMessage);
    }
};
