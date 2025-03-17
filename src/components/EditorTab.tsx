import { IoIosCloseCircleOutline } from 'react-icons/io';

interface EditorTabProps {
    name: string;
    icon: string;
    selected: boolean;
    onClick: () => void;
    onClose: () => void;
}

const EditorTab = ({
    name,
    icon,
    selected,
    onClick,
    onClose,
}: EditorTabProps) => {
    return (
        <div
            onClick={onClick}
            className={`flex flex-row items-center px-4 py-2 rounded-t-lg transition-all duration-200 gap-x-1 cursor-pointer ${
                selected
                    ? 'bg-[#cfcfcf] dark:bg-[#2b2b2b] shadow-lg'
                    : 'bg-[#f1f1f1] dark:bg-[#121212]'
            }`}
        >
            <img src={icon} className="w-5 h-5" alt={`${name} icon`} />
            <p className="flex-1 text-sm mx-1 truncate">{name}</p>

            <button onClick={onClose} className="transition-all">
                <IoIosCloseCircleOutline className="w-5 h-5 ms-2" />
            </button>
        </div>
    );
};

export default EditorTab;
