import { BiInfoCircle } from 'react-icons/bi';

const FileStructurePage = () => {
    return (
        <div className="shadow p-4 h-full w-full text-headlineColor-light dark:text-headlineColor-dark bg-cardBackgroundColor-light dark:bg-cardBackgroundColor-dark rounded-lg">
            <div className="flex flex-row z-10 justify-between items-center mb-4 p-2 rounded-lg shadow bg-highlightColor-light dark:bg-highlightColor-dark">
                <h1 className="text-xl font-bold">Project Structure</h1>
                <BiInfoCircle className="text-xl cursor-pointer" />
            </div>
        </div>
    );
};

export default FileStructurePage;
