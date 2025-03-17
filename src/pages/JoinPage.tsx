import { useEffect, useState } from 'react';
import JoinForm from '../components/JoinForm';
import { getUserDetailsService } from '../ApiService/UserDetailsService';
import { useNavigate } from 'react-router-dom';
import { v4 as uuid, validate, version } from 'uuid';
import { createActiveUserService } from '../ApiService/CreateActiveUserService';
import toast from 'react-hot-toast';
import { joinRoomService } from '../ApiService/JoinRoomService';
import { joinRoomDto } from '../DTO/dto';

interface UserDetails {
    user_name: string;
    user_id: string;
    profile_picture: string;
}

const JoinPage = () => {
    const navigate = useNavigate();

    // State for form values
    const [roomId, setRoomId] = useState<string>('');
    const [roomType, setRoomType] = useState<string>('Public');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [password, setPassword] = useState<string>('');

    // User details fetched from API
    const [userDetails, setUserDetails] = useState<UserDetails>({
        user_name: '',
        user_id: '',
        profile_picture: '',
    });

    const [isJoining, setIsJoining] = useState<boolean>(false);

    // Fetch user details on component mount
    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const userDetailsResponse = await getUserDetailsService();
                if (userDetailsResponse) {
                    setUserDetails(userDetailsResponse);
                }
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };
        fetchUserDetails();
    }, []);

    const getUniqueID = (): string => uuid();
    const togglePasswordVisibility = () => setShowPassword(!showPassword);
    const isValidRoomId = (uuid: string): boolean =>
        validate(uuid) && version(uuid) === 4;

    const setUserName = (name: string) => {
        const [firstname, lastname] = name.split(' ');
        setUserDetails({
            user_name: name,
            user_id: `temp-user_${getUniqueID()}`,
            profile_picture:
                `https://avatar.iran.liara.run/username?username=${firstname}` +
                (lastname !== undefined ? `+${lastname}` : ''),
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsJoining(true);

        try {
            if (!isValidRoomId(roomId)) {
                toast.error('Please enter a valid Room Id');
                return;
            }

            const user_payload: joinRoomDto = {
                roomId,
                userId: userDetails.user_id,
                roomPassword: password,
            };

            await joinRoomService(user_payload);

            await createActiveUserService(userDetails);

            navigate(`/editor/${roomId}`, {
                state: userDetails,
            });
        } catch (error) {
            // Handle form submission errors
            console.error('Error submitting join form:', error);
        } finally {
            setIsJoining(false);
        }
    };

    return (
        <div className="min-h-full w-full py-10">
            <JoinForm
                roomType={roomType}
                showPassword={showPassword}
                password={password}
                user_name={userDetails.user_name}
                roomId={roomId}
                isJoining={isJoining}
                togglePasswordVisibility={togglePasswordVisibility}
                handleSubmit={handleSubmit}
                setUserDetails={setUserName} // Passing only the function to update user_name
                setRoomId={setRoomId}
                setPassword={setPassword}
                setRoomType={setRoomType}
            />
        </div>
    );
};

export default JoinPage;
