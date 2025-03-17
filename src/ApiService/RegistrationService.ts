import axios from 'axios';
import { registerDto } from '../DTO/dto';

export const registerService = async (
    userPayload: registerDto,
    profile_picture: File | null
) => {
    try {
        const formData = new FormData();

        if (profile_picture) {
            formData.append('profile_picture', profile_picture);
        }

        Object.entries(userPayload).forEach(([key, value]) => {
            formData.append(key, value);
        });

        const response = await axios.post(
            'http://localhost:3000/auth/register',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );

        return response.data;
    } catch (error: any) {
        // Check if it's a response error from backend (i.e., validation error)
        if (error.response && error.response.data) {
            const errorMessage =
                error.response.data.message ||
                'An unknown error occurred during registration.';
            console.error('Registration failed:', errorMessage);
            throw new Error(errorMessage);
        }
        // Catch general errors (e.g., network or server issues)
        console.error('Registration failed:', error.message);
        throw new Error('Network or server issue. Please try again later.');
    }
};
