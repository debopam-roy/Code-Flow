const StackCard = ({
    val,
    name,
    icon,
    description,
    onClick,
    isSelected,
}: {
    val: string;
    name: string;
    icon: string;
    description: string;
    onClick: (val: string) => void;
    isSelected: boolean;
}) => {
    const handleClick = () => {
        onClick(val);
    };

    return (
        <div
            className={`p-4 rounded-lg transition-all duration-75 shadow-lg cursor-pointer text-headlineColor-light dark:text-headlineColor-dark 
          ${
              isSelected
                  ? 'bg-blue-50 dark:bg-blue-500 dark:bg-opacity-20 border border-blueBackgroundColor-light dark:border-blueBackgroundColor-dark'
                  : 'dark:bg-highlightColor-dark'
          }`}
            onClick={handleClick}
        >
            <img src={icon} alt={name} className="w-12 h-12 mx-auto" />
            <p className="text-center font-bold text-lg mt-2">{name}</p>
            <p className="text-sm text-center">{description}</p>
        </div>
    );
};

export default StackCard;
