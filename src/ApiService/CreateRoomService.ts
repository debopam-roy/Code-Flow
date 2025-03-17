import axios from 'axios';
import { createRoomDto } from '../DTO/dto';
import toast from 'react-hot-toast';

export const createRoomService = async (userPayload: createRoomDto) => {
    try {
        const response = await axios.post(
            'http://localhost:3000/room/create_room',
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

        console.error('Create room failed:', errorMessage);
        toast.error(errorMessage);
        throw new Error(errorMessage);
    }
};
