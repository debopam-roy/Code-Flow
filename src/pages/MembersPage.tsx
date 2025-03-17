import { useEffect, useRef, useState } from 'react';
import SocketManager from '../server/SocketManager';
import toast from 'react-hot-toast';
import { Member } from '../DTO/dto';
import User from '../components/User';

const MembersPage = ({ roomDetails }: { roomDetails: any }) => {
    const [members, setMembers] = useState<Member[]>([]);
    const [userId, setUserId] = useState<string>('');
    const socketRef = useRef(SocketManager.getInstance().getSocket('members'));

    useEffect(() => {
        const memberSocket = socketRef.current;

        if (!memberSocket) return;
                
        const handleConnect = () => {
            console.log('Connected to members namespace');
            const id: string = memberSocket.id ?? '';

            setUserId(id);
            memberSocket.emit('joinRoom', roomDetails);
        };

        const handleUserJoined = (data: Member) => {
            toast.success(`${data.user_name} has joined.`);
            setMembers((prevMembers) => [...prevMembers, data]);
        };

        const handleCurrentMembers = (currentMembers: Member[]) => {
            setMembers(currentMembers);
            toast.success('You have joined.');
        };

        const handleUserLeft = (data: Member) => {
            toast.success(`${data.user_name} has left.`);
            setMembers((prevMembers) =>
                prevMembers.filter(
                    (member) => member.socket_id !== data.socket_id
                )
            );
        };

        memberSocket.on('connect', handleConnect);
        memberSocket.on('userJoined', handleUserJoined);
        memberSocket.on('currentMembers', handleCurrentMembers);
        memberSocket.on('userLeft', handleUserLeft);

        return () => {
            memberSocket.off('connect', handleConnect);
            memberSocket.off('userJoined', handleUserJoined);
            memberSocket.off('currentMembers', handleCurrentMembers);
            memberSocket.off('userLeft', handleUserLeft);
            toast.success('You have left.');
            // memberSocket.disconnect();
        };
    }, [roomDetails, userId]);

    return (
        <div className="flex">
            <div className="overflow-auto w-full">
                {members.map((member) => (
                    <User
                        key={member.socket_id}
                        user_name={
                            member.socket_id == userId
                                ? `${member.user_name} (You)`
                                : member.user_name
                        }
                        profile_picture={member.profile_picture}
                    />
                ))}
            </div>
        </div>
    );
};

export default MembersPage;
