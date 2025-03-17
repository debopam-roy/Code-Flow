import { v4 as uuid } from 'uuid';
import toast from 'react-hot-toast';
import { createRoomDto } from '../DTO/dto';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CreateForm from '../components/CreateForm';
import cryptoRandomString from 'crypto-random-string';
import { createRoomService } from '../ApiService/CreateRoomService';
import { getUserDetailsService } from '../ApiService/UserDetailsService';
import { createActiveUserService } from '../ApiService/CreateActiveUserService';

const CreatePage = () => {
    const navigate = useNavigate();

    const [userDetails, setUserDetails] = useState<Record<string, string>>({
        user_name: '',
        user_id: '',
        profile_picture: '',
    });

    const [roomId, setRoomId] = useState<string>('');
    const [roomName, setRoomName] = useState<string>('');
    const [roomType, setRoomType] = useState<string>('Public');
    const [password, setPassword] = useState<string>('');
    const [roomDescription, setRoomDescription] = useState<string>('');
    const [roomGuidelines, setRoomGuidelines] = useState<string[]>([]);
    const [guidelineInput, setGuidelineInput] = useState<string>('');
    const [isCreating, setIsCreating] = useState<boolean>(false);
    const [requirePermission, setRequirePermission] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const user_details = await getUserDetailsService();
                setUserDetails(user_details);
            } catch (error: any) {
                toast.error('User is not verified.');
                navigate('/login');
            }
        };
        fetchUserDetails();
    }, [navigate]);

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const getUniqueID = (): string => uuid();

    const createNewRoom = () => {
        const newRoomId = getUniqueID();
        const newPassword = cryptoRandomString({
            length: 15,
            type: 'alphanumeric',
        });
        setRoomId(newRoomId);
        setPassword(newPassword);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsCreating(true);

        try {
            if (!userDetails.user_id || !userDetails.user_name) {
                throw new Error(
                    'User details are incomplete. Please verify the user.'
                );
            }

            await createActiveUserService(userDetails);

            const roomPrivacy =
                roomType === 'Private'
                    ? requirePermission
                        ? 'Private'
                        : 'Protected'
                    : 'Public';

            const data: createRoomDto = {
                roomId: roomId || getUniqueID(),
                roomName: roomName.trim(),
                userId: userDetails.user_id,
                roomPrivacy,
                roomPassword: roomType !== 'Public' ? password : undefined,
                roomDescription: roomDescription.trim(),
                roomGuidelines,
                projectType: 'blank',
            };

            navigate('/create/1', { state: data });
        } catch (error: any) {
            console.error('Error while creating room:', error);
            toast.error(
                error.message ||
                    'An unexpected error occurred. Please try again.'
            );
        } finally {
            setIsCreating(false);
        }
    };

    const addGuideline = () => {
        if (guidelineInput.trim()) {
            setRoomGuidelines((prev) => [...prev, guidelineInput.trim()]);
            setGuidelineInput('');
        }
    };

    const removeGuideline = (index: number) => {
        setRoomGuidelines((prev) => prev.filter((_, i) => i !== index));
    };

    return (
        <div className="min-h-full w-full py-10">
            <CreateForm
                roomId={roomId}
                roomName={roomName}
                roomType={roomType}
                password={password}
                roomDescription={roomDescription}
                roomGuidelines={roomGuidelines}
                guidelineInput={guidelineInput}
                isCreating={isCreating}
                requirePermission={requirePermission}
                showPassword={showPassword}
                setRoomId={setRoomId}
                setRoomName={setRoomName}
                setRoomType={setRoomType}
                setPassword={setPassword}
                setRoomDescription={setRoomDescription}
                setGuidelineInput={setGuidelineInput}
                addGuideline={addGuideline}
                removeGuideline={removeGuideline}
                togglePasswordVisibility={togglePasswordVisibility}
                createNewRoom={createNewRoom}
                handleSubmit={handleSubmit}
                setRequirePermission={setRequirePermission}
            />
        </div>
    );
};

export default CreatePage;
