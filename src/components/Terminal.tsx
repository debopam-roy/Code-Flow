import { BiInfoCircle } from 'react-icons/bi';

const Terminal = () => {
    return (
        <div className="flex flex-row z-10 justify-between items-center mb-4 p-2 rounded-lg shadow bg-highlightColor-light dark:bg-highlightColor-dark">
            <h1 className="text-xl font-bold">Terminal</h1>
            <BiInfoCircle className="text-xl cursor-pointer" />
        </div>
    );
};

export default Terminal;
