import axios from 'axios';
import toast from 'react-hot-toast';

const getErrorMessage = (error: any) => {
    if (error.response) {
        if (error.response.status === 400) {
            return 'Invalid credentials. Please check your room credentials.';
        }
        if (error.response.status === 500) {
            return 'Internal server error. Please try again later.';
        }
        return error.response.data?.message || 'An unexpected error occurred.';
    }
    if (error.request) {
        return 'Network issue. Please check your connection and try again.';
    }
    return `Error: ${error.message}`;
};

export const getRoomDetailsService = async (roomId: String): Promise<any> => {
    try {
        const response = await axios.get(
            `http://localhost:3000/room/${roomId}`
        );
        return response.data;
    } catch (error: any) {
        let errorMessage = getErrorMessage(error);

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

        console.error('Fetching room failed:', errorMessage);
        toast.error(errorMessage);
        throw new Error(errorMessage);
    }
};
