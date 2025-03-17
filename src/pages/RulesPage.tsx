import { GiPointyHat } from 'react-icons/gi';
import { RulesPageProps } from '../DTO/dto';

const RulesPage: React.FC<RulesPageProps> = ({
    name,
    id,
    owner,
    description,
    guidelines,
}) => {
    return (
        <div className="p-4 flex flex-col space-y-1 overflow-auto">
            <p className="truncate">
                <strong>Name:</strong> {name}
            </p>

            <p className="truncate">
                <strong>Room ID:</strong> {id}
            </p>

            <p className="truncate">
                <strong>Created by:</strong> {owner}
            </p>

            <p className="truncate">
                <strong>Description:</strong> {description}
            </p>

            <div>
                <strong>Guidelines:</strong>
                {Array.isArray(guidelines) ? (
                    guidelines.map((item, index) => (
                        <div
                            key={index}
                            className="flex items-center z-10 gap-x-3 p-1 px-2 rounded-md ms-2 mt-2 shadow bg-highlightColor-light dark:bg-highlightColor-dark"
                        >
                            <div>
                                <GiPointyHat className="text-highlightColor-dark dark:text-highlightColor-light" />
                            </div>
                            <p className="text-gray-800 dark:text-gray-200 text-base font-medium">
                                {item}
                            </p>
                        </div>
                    ))
                ) : (
                    <p>No guidelines available</p>
                )}
            </div>
        </div>
    );
};

export default RulesPage;
