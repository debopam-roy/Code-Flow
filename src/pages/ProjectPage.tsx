import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ProjectForm from '../components/ProjectForm';
import toast from 'react-hot-toast';
import { createRoomService } from '../ApiService/CreateRoomService';

const ProjectPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const roomDetails = location.state || null; // Ensure it's null if empty

    const [isSaving, setIsSaving] = useState<boolean>(false);

    // Redirect if user is not logged in or no room details are passed
    useEffect(() => {
        if (!roomDetails) {
            toast.error('Invalid access. Redirecting...');
            navigate('/');
        }
    }, [roomDetails, navigate]);

    const handleProjectSubmit = async (selectedStack: string) => {
        if (!roomDetails) return;

        setIsSaving(true);

        try {
            const updatedRoomDetails = structuredClone(roomDetails);
            updatedRoomDetails.projectType = selectedStack;

            console.log(updatedRoomDetails);

            await createRoomService(updatedRoomDetails);
            toast.success('Room created successfully!');
            navigate('/');
        } catch (error) {
            console.error('Error creating room:', error);
            toast.error('Failed to create room. Please try again.');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="min-h-full w-full py-10">
            {roomDetails ? (
                <ProjectForm
                    project_submit={handleProjectSubmit}
                    isSaving={isSaving}
                />
            ) : (
                <p className="text-center text-gray-500">Redirecting...</p>
            )}
        </div>
    );
};

export default ProjectPage;
