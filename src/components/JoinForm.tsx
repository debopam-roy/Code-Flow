import { Link } from 'react-router-dom';
import { JoinFormProps } from '../DTO/dto';

const JoinForm = ({
    roomType,
    showPassword,
    password,
    user_name,
    roomId,
    isJoining,
    togglePasswordVisibility,
    handleSubmit,
    setUserDetails,
    setRoomId,
    setPassword,
    setRoomType,
}: JoinFormProps) => {
    return (
        <div className="h-full flex items-center justify-center mx-4 md:mx-2">
            <div
                id="cardContainer"
                className="p-8 bg-cardBackgroundColor-light dark:bg-cardBackgroundColor-dark rounded-lg shadow-lg sm:w-full sm:max-w-md"
            >
                <div className="text-left">
                    <h2 className="text-4xl text-center font-dst text-headlineColor-light dark:text-headlineColor-dark">
                        Join Meeting
                    </h2>
                    <p className="mt-3 text-center font-semibold text-suggestionColor-light text-lg dark:text-suggestionColor-dark">
                        Ready for the meeting? Here we go!
                    </p>
                </div>
                <form
                    id="joinform"
                    className="space-y-10"
                    onSubmit={handleSubmit}
                >
                    <div className="flex flex-col mt-8 space-y-4">
                        {/* Full Name */}
                        <div>
                            <label
                                htmlFor="full_name"
                                className="block text-suggestionColor-light dark:text-suggestionColor-dark"
                            >
                                Full Name
                            </label>
                            <input
                                required
                                type="text"
                                id="full_name"
                                value={user_name}
                                onChange={(e) => setUserDetails(e.target.value)}
                                placeholder="Ex: John Doe"
                                className="w-full mt-1 px-4 py-2 bg-textInputBackgroundColor-light dark:bg-textInputBackgroundColor-dark border border-textInputBorderColor-light dark:border-textInputBorderColor-dark rounded-lg shadow-sm focus:ring-2 text-suggestionColor-light dark:text-suggestionColor-dark"
                            />
                        </div>

                        {/* Room ID */}
                        <div>
                            <label
                                htmlFor="room_id"
                                className="block text-suggestionColor-light dark:text-suggestionColor-dark"
                            >
                                Room ID
                            </label>
                            <input
                                required
                                type="text"
                                id="room_id"
                                value={roomId}
                                onChange={(e) => setRoomId(e.target.value)}
                                placeholder="Ex: 8df664ed-e634-49b3-9f23-5b0025e537be"
                                className="w-full mt-1 px-4 py-2 bg-textInputBackgroundColor-light dark:bg-textInputBackgroundColor-dark border border-textInputBorderColor-light dark:border-textInputBorderColor-dark rounded-lg shadow-sm focus:ring-2 text-suggestionColor-light dark:text-suggestionColor-dark"
                            />
                        </div>

                        {/* Room Type Selection */}
                        <div>
                            <label
                                htmlFor="status"
                                className="block font-medium text-suggestionColor-light dark:text-suggestionColor-dark"
                            >
                                Room Type
                            </label>
                            <div className="mt-1 pe-4 py-2 flex justify-between space-x-2">
                                {['Public', 'Private'].map((item) => (
                                    <label
                                        key={item}
                                        className={`inline-flex items-center cursor-pointer mt-1 px-4 py-2 bg-textInputBackgroundColor-light dark:bg-textInputBackgroundColor-dark border border-textInputBorderColor-light dark:border-textInputBorderColor-dark rounded-lg shadow-sm focus:ring-2 ${roomType === item ? 'bg-blue-500 text-white' : ''}`}
                                    >
                                        <input
                                            type="radio"
                                            name="status"
                                            checked={roomType === item}
                                            onChange={() => setRoomType(item)}
                                            className="form-radio"
                                        />
                                        <span className="ml-2 block font-medium text-suggestionColor-light dark:text-suggestionColor-dark">
                                            {item}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Password Field (Only for Private Room) */}
                        {roomType === 'Private' && (
                            <div>
                                <div className="flex justify-between items-center">
                                    <label
                                        htmlFor="password"
                                        className="block font-medium text-suggestionColor-light dark:text-suggestionColor-dark"
                                    >
                                        Password
                                    </label>
                                    <span
                                        onClick={togglePasswordVisibility}
                                        className="text-buttonHoverColor-light dark:text-buttonHoverColor-light cursor-pointer hover:text-buttonHoverColor-light dark:hover:text-buttonHoverColor-dark"
                                    >
                                        {showPassword ? 'Hide' : 'Show'}
                                    </span>
                                </div>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    id="password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    placeholder="Ex: password@123"
                                    className="w-full mt-1 px-4 py-2 bg-textInputBackgroundColor-light dark:bg-textInputBackgroundColor-dark border border-textInputBorderColor-light dark:border-textInputBorderColor-dark rounded-lg shadow-sm focus:ring-2 text-suggestionColor-light dark:text-suggestionColor-dark"
                                />
                            </div>
                        )}
                    </div>

                    <button
                        type="submit"
                        className={`w-full py-3 bg-buttonColor-light dark:bg-buttonColor-light uppercase hover:bg-buttonHoverColor-light dark:hover:bg-buttonHoverColor-dark ${isJoining ? 'cursor-not-allowed' : 'cursor-pointer'} font-semibold rounded-md shadow-md transition duration-200 text-headlineColor-dark`}
                        disabled={isJoining}
                    >
                        {isJoining ? 'Joining...' : 'Join'}
                    </button>

                    <div className="space-y-2">
                        <p className="text-center">
                            Can't find a proper topic?{' '}
                            <Link
                                to="/create/0"
                                className="text-buttonHoverColor-light hover:text-buttonHoverColor-dark"
                            >
                                <u>Create new meeting</u>
                            </Link>
                        </p>
                        <div className="flex items-center">
                            <hr className="flex-grow border-t border-gray-300" />
                            <p className="mx-4 text-gray-500">or</p>
                            <hr className="flex-grow border-t border-gray-300" />
                        </div>
                        <p className="text-center">
                            Sign in to your account now!{' '}
                            <Link
                                to="/login"
                                className="text-buttonHoverColor-light hover:text-buttonHoverColor-dark"
                            >
                                <u>Login Here</u>
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default JoinForm;
