import axios from 'axios';

export const getUserDetailsService = async () => {
    try {
        const response = await axios.get(
            'http://localhost:3000/auth/get_host',
            {
                withCredentials: true,
            }
        );

        if (response.data.success) {
            return response.data.data;
        }

        throw new Error('Failed to fetch user details. Please try again.');
    } catch (error: any) {
        let errorMessage =
            'An unexpected error occurred. Please try again later.';

        if (error.response) {
            if (error.response.status === 400) {
                errorMessage =
                    'Invalid credentials. Please check your room credentials.';
            } else if (error.response.status === 500) {
                errorMessage = 'Internal server error. Please try again later.';
            } else if (error.response.data && error.response.data.message) {
                errorMessage = error.response.data.message;
            }
        } else if (error.request) {
            errorMessage =
                'Network issue. Please check your connection and try again.';
        } else {
            errorMessage = `Error: ${error.message}`;
        }
        console.error('User data fetching failed:', errorMessage);
        throw new Error(errorMessage);
    }
};
