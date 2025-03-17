import { FaAngleUp, FaAngleDown } from 'react-icons/fa6';

const SectionHeader = ({
    title,
    collapsed,
    onCollapseButtonClick,
}: {
    title: string;
    collapsed: boolean;
    onCollapseButtonClick(): void;
}) => {
    return (
        <div className="flex flex-row z-10 justify-between items-center p-2 rounded-lg shadow bg-highlightColor-light dark:bg-highlightColor-dark gap-x-4 relative overflow-visible">
            <h1 className="text-xl flex-1 font-bold truncate">{title}</h1>
            <div
                className="bg-textInputBackgroundColor-light dark:bg-textInputBackgroundColor-dark  rounded-full p-1 cursor-pointer"
                onClick={onCollapseButtonClick}
            >
                {collapsed ? <FaAngleDown /> : <FaAngleUp />}
            </div>
        </div>
    );
};

export default SectionHeader;
