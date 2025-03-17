import { UserProps } from '../DTO/dto';

const User: React.FC<UserProps> = ({ user_name, profile_picture }) => {
    return (
        <div className="flex flex-row gap-x-4 overflow-hidden p-2 m-2 z-10 bg-highlightColor-light dark:bg-highlightColor-dark rounded-lg shadow items-center justify-start">
            <img
                src={profile_picture}
                alt={user_name}
                className="rounded-full w-10"
            />
            <p className="truncate font-sebold text-lg font-nunito">
                {user_name}
            </p>
        </div>
    );
};

export default User;
