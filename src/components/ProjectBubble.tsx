const ProjectBubble = ({
    name,
    selected,
    onClick,
}: {
    name: string;
    selected: boolean;
    onClick: any;
}) => {
    return (
        <button
            onClick={() => onClick(name)}
            className={`
                px-4 py-2 my-1 rounded-full text-sm transition-all duration-75
                text-suggestionColor-light dark:text-suggestionColor-dark
                ${
                    selected
                        ? 'shadow-xl bg-[#edecee] dark:bg-[#2b2b2b] scale-105'
                        : 'bg-[#e7e7e7] dark:bg-[#121212] shadow-none scale-100'
                }
            `}
        >
            {name}
        </button>
    );
};

export default ProjectBubble;
