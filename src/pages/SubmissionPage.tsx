import { useEffect } from 'react';
import SocketManager from '../server/SocketManager';
import Terminal from '../components/Terminal';

const SubmissionPage = ({ roomDetails }: { roomDetails: any }) => {
    // useEffect(() => {
    //     const socketManager = SocketManager.getInstance();
    //     const submissionSocket = socketManager.getSocket('submission');

    //     submissionSocket.on('connect', () => {
    //         submissionSocket.emit('joinRoom', roomDetails);
    //     });

    //     submissionSocket.on('disconnect', () => {
    //         console.log('Disconnected from submission namespace');
    //     });

    //     return () => {
    //         socketManager.disconnect('submission');
    //     };
    // }, [roomDetails]);

    return (
        <div className="py-2 px-4 h-full w-full text-headlineColor-light dark:text-headlineColor-dark bg-cardBackgroundColor-light dark:bg-cardBackgroundColor-dark rounded-lg">
            <Terminal />
        </div>
    );
};

export default SubmissionPage;
