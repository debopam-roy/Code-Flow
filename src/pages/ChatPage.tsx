import { useEffect, useRef, useState } from 'react';
import { ChatMessage } from '../DTO/dto';
import Message from '../components/Message';
import SocketManager from '../server/SocketManager';

interface RoomDetails {
    roomId: string;
    user_name: string;
}

const ChatPage = ({ roomDetails }: { roomDetails: RoomDetails }) => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const socketRef = useRef(SocketManager.getInstance().getSocket('chat'));

    useEffect(() => {
        const chatSocket = socketRef.current;
        if (!chatSocket) return;

        const handleMessage = (event: string) => (message: ChatMessage) =>
            setMessages((prev) => [...prev, message]);

        const events = {
            userJoined: handleMessage('userJoined'),
            userLeft: handleMessage('userLeft'),
            peerMessage: handleMessage('peerMessage'),
            ownMessage: handleMessage('ownMessage'),
            currentMembers: (message: ChatMessage) => setMessages([message]),
        };

        Object.entries(events).forEach(([event, handler]) =>
            chatSocket.on(event, handler)
        );

        chatSocket.emit('joinRoom', roomDetails);

        return () => {
            Object.keys(events).forEach((event) => chatSocket.off(event));
        };
    }, [roomDetails]);

    const postNewMessage = () => {
        if (!newMessage.trim()) return;
        const chatSocket = socketRef.current;
        if (!chatSocket) return;

        chatSocket.emit('sendMessage', {
            roomId: roomDetails.roomId,
            message: newMessage,
        });

        setNewMessage('');
    };

    return (
        <div className="flex flex-col w-full h-full p-2 px-0 space-y-2">
            <div className="flex flex-col flex-1 overflow-auto">
                {messages.map((msg) => (
                    <Message
                        key={msg.socket_id + msg.time}
                        sender={msg.sender}
                        message_content={msg.message_content}
                        time={msg.time}
                        isOwnMessage={msg.socket_id === socketRef.current?.id}
                    />
                ))}
            </div>
            <div className="flex flex-row items-center px-2 space-x-1 justify-evenly w-full">
                <input
                    type="text"
                    className="px-4 py-2 flex-1 bg-textInputBackgroundColor-light dark:bg-textInputBackgroundColor-dark border border-textInputBorderColor-light dark:border-textInputBorderColor-dark rounded-lg shadow-sm focus:ring-2 text-suggestionColor-light dark:text-suggestionColor-dark focus:ring-textInputRingColor-light dark:focus:ring-textInputRingColor-dark"
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                <button
                    onClick={postNewMessage}
                    className="px-4 py-2 bg-buttonColor-light dark:bg-buttonColor-dark uppercase hover:bg-buttonHoverColor-light dark:hover:bg-buttonHoverColor-dark cursor-pointer font-semibold rounded-lg shadow-md transition duration-200 text-headlineColor-dark"
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatPage;
