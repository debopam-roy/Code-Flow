import React from 'react';
import { IoIosTimer } from 'react-icons/io';

interface MessageProps {
    sender: string;
    message_content: string;
    time: string;
    isOwnMessage: boolean;
}

const Message: React.FC<MessageProps> = ({
    sender,
    message_content,
    time,
    isOwnMessage,
}) => {
    const convertToLocalTime = (timeGMT: string) => {
        const [hours, minutes, seconds] = timeGMT.split(':').map(Number);
        const localDate = new Date();
        localDate.setUTCHours(hours, minutes, seconds, 0);
        return localDate.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        });
    };

    return (
        <div
            className={`w-full flex ${isOwnMessage ? 'justify-end' : 'justify-start'} py-1 px-2`}
        >
            <div
                className={`bg-highlightColor-light dark:bg-highlightColor-dark p-2 shadow w-fit max-w-[75%] px-4 ${
                    isOwnMessage
                        ? 'rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl rounded-br-none'
                        : 'rounded-tl-2xl rounded-tr-2xl rounded-bl-none rounded-br-2xl'
                }`}
            >
                <div className="flex flex-row items-center justify-between w-full space-x-2">
                    <p className="truncate font-bold">{sender}</p>
                    <div className="flex flex-row items-center space-x-1 font-extralight text-xs">
                        <IoIosTimer className="w-4 h-4" />
                        <p>{convertToLocalTime(time)}</p>
                    </div>
                </div>
                <p className="ps-2 font-extralight break-words">
                    {message_content.trim()}
                </p>
            </div>
        </div>
    );
};

export default Message;
