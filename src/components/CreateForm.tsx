import React from 'react';
import { Link } from 'react-router-dom';
import { CreateFormProps } from '../DTO/dto';

const CreateForm: React.FC<CreateFormProps> = ({
    roomId,
    roomName,
    roomType,
    password,
    roomDescription,
    roomGuidelines,
    guidelineInput,
    isCreating,
    requirePermission,
    showPassword,
    setRoomId,
    setRoomName,
    setRoomType,
    setPassword,
    setRoomDescription,
    setGuidelineInput,
    addGuideline,
    removeGuideline,
    togglePasswordVisibility,
    createNewRoom,
    handleSubmit,
    setRequirePermission,
}) => {
    return (
        <div className="h-full flex items-center justify-center mx-4 md:mx-2">
            <div
                id="cardContainer"
                className="p-8 bg-cardBackgroundColor-light dark:bg-cardBackgroundColor-dark rounded-lg shadow-lg sm:w-full sm:max-w-md"
            >
                <div className="text-left">
                    <h2 className="text-4xl text-center font-dst text-headlineColor-light dark:text-headlineColor-dark">
                        Create Room
                    </h2>
                    <p className="mt-3 text-center font-semibold text-suggestionColor-light text-lg dark:text-suggestionColor-dark">
                        Set up your meeting space
                    </p>
                </div>

                <form
                    id="createform"
                    className="space-y-10"
                    onSubmit={handleSubmit}
                >
                    <div className="flex flex-col mt-8 space-y-4">
                        {/* Room ID */}
                        <div>
                            <div className="flex space-x-2 flex-row justify-between">
                                <label
                                    htmlFor="room_id"
                                    className="block text-suggestionColor-light dark:text-suggestionColor-dark"
                                >
                                    Room ID
                                </label>

                                <p
                                    className={`text-buttonHoverColor-light text-right dark:text-buttonHoverColor-light cursor-pointer hover:text-buttonHoverColor-light dark:hover:text-buttonHoverColor-dark`}
                                >
                                    <u onClick={createNewRoom}>
                                        Create a new room
                                    </u>
                                </p>
                            </div>

                            <input
                                required
                                type="text"
                                id="room_id"
                                value={roomId}
                                onChange={(e) => setRoomId(e.target.value)}
                                placeholder="Ex: 8df664ed-e634-49b3-9f23-5b0025e537be"
                                className="w-full mt-1 px-4 py-2 bg-textInputBackgroundColor-light dark:bg-textInputBackgroundColor-dark border border-textInputBorderColor-light dark:border-textInputBorderColor-dark rounded-lg shadow-sm focus:ring-2 text-suggestionColor-light dark:text-suggestionColor-dark focus:ring-textInputRingColor-light dark:focus:ring-textInputRingColor-dark"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="room_name"
                                className="block text-suggestionColor-light dark:text-suggestionColor-dark"
                            >
                                Meeting Name
                            </label>
                            <input
                                type="text"
                                id="room_name"
                                value={roomName}
                                onChange={(e) => setRoomName(e.target.value)}
                                placeholder="Ex: Google Round I interview"
                                className="w-full mt-1 px-4 py-2 bg-textInputBackgroundColor-light dark:bg-textInputBackgroundColor-dark border border-textInputBorderColor-light dark:border-textInputBorderColor-dark rounded-lg shadow-sm focus:ring-2 text-suggestionColor-light dark:text-suggestionColor-dark focus:ring-textInputRingColor-light dark:focus:ring-textInputRingColor-dark"
                            />
                        </div>

                        {/* Room Privacy */}
                        <div>
                            <label
                                htmlFor="status"
                                className="block font-medium text-suggestionColor-light dark:text-suggestionColor-dark"
                            >
                                Room Type
                            </label>
                            <div className="mt-1 pe-4  flex justify-between space-x-2">
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

                        {/* Room Description */}
                        <div>
                            <label
                                htmlFor="room_description"
                                className="block text-suggestionColor-light dark:text-suggestionColor-dark"
                            >
                                Room Description
                            </label>
                            <textarea
                                id="room_description"
                                value={roomDescription}
                                onChange={(e) =>
                                    setRoomDescription(e.target.value)
                                }
                                placeholder="Ex: Junior Developer DSA & system design round"
                                className="w-full mt-1 px-4 py-2 bg-textInputBackgroundColor-light dark:bg-textInputBackgroundColor-dark border border-textInputBorderColor-light dark:border-textInputBorderColor-dark rounded-lg shadow-sm focus:ring-2 text-suggestionColor-light dark:text-suggestionColor-dark focus:ring-textInputRingColor-light dark:focus:ring-textInputRingColor-dark"
                            />
                        </div>

                        {/* Room Guidelines */}
                        <div>
                            <label
                                htmlFor="room_guidelines"
                                className="block text-suggestionColor-light dark:text-suggestionColor-dark"
                            >
                                Room Guidelines
                            </label>
                            <div className="flex items-center space-x-2">
                                <input
                                    type="text"
                                    id="room_guideline_input"
                                    value={guidelineInput}
                                    onChange={(e) =>
                                        setGuidelineInput(e.target.value)
                                    }
                                    placeholder="Ex: Don't cheat in the interview"
                                    className="w-full mt-1 px-4 py-2 bg-textInputBackgroundColor-light dark:bg-textInputBackgroundColor-dark border border-textInputBorderColor-light dark:border-textInputBorderColor-dark rounded-lg shadow-sm focus:ring-2 text-suggestionColor-light dark:text-suggestionColor-dark focus:ring-textInputRingColor-light dark:focus:ring-textInputRingColor-dark"
                                />
                                <button
                                    type="button"
                                    onClick={addGuideline}
                                    className={`px-4 py-2 bg-buttonColor-light dark:bg-buttonColor-light uppercase hover:bg-buttonHoverColor-light dark:hover:bg-buttonHoverColor-dark ${isCreating ? 'cursor-not-allowed' : 'cursor-pointer'} font-semibold rounded-lg shadow-md transition duration-200 text-headlineColor-dark`}
                                    disabled={isCreating}
                                >
                                    Add
                                </button>
                            </div>
                            <ul className="mt-2 space-y-1">
                                {roomGuidelines.map((guideline, index) => (
                                    <li
                                        key={index}
                                        className="flex justify-between items-center mt-1 px-4 py-2 bg-textInputBackgroundColor-light dark:bg-textInputBackgroundColor-dark border border-textInputBorderColor-light dark:border-textInputBorderColor-dark rounded-lg shadow-sm focus:ring-2 text-suggestionColor-light dark:text-suggestionColor-dark focus:ring-textInputRingColor-light dark:focus:ring-textInputRingColor-dark"
                                    >
                                        {guideline}
                                        <button
                                            type="button"
                                            onClick={() =>
                                                removeGuideline(index)
                                            }
                                            className="text-red-500 hover:underline"
                                        >
                                            Remove
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Password (Only for Private Room) */}
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
                                        className={`text-buttonHoverColor-light dark:text-buttonHoverColor-light cursor-pointer hover:text-buttonHoverColor-light dark:hover:text-buttonHoverColor-dark`}
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
                                    className="w-full mt-1 px-4 py-2 bg-textInputBackgroundColor-light dark:bg-textInputBackgroundColor-dark border border-textInputBorderColor-light dark:border-textInputBorderColor-dark rounded-lg shadow-sm focus:ring-2 
                              text-suggestionColor-light dark:text-suggestionColor-dark
                              focus:ring-textInputRingColor-light dark:focus:ring-textInputRingColor-dark"
                                />
                            </div>
                        )}

                        {roomType === 'Private' && (
                            <div>
                                <label className="inline-flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={requirePermission}
                                        onChange={() =>
                                            setRequirePermission(
                                                !requirePermission
                                            )
                                        }
                                        className="form-checkbox h-5 w-5 text-blue-600"
                                    />
                                    <span className="ml-2 text-suggestionColor-light dark:text-suggestionColor-dark">
                                        Members need admin permission to join
                                        meeting.
                                    </span>
                                </label>
                            </div>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className={`w-full py-3 bg-buttonColor-light dark:bg-buttonColor-light uppercase hover:bg-buttonHoverColor-light dark:hover:bg-buttonHoverColor-dark ${isCreating ? 'cursor-not-allowed' : 'cursor-pointer'} font-semibold rounded-md shadow-md transition duration-200 text-headlineColor-dark`}
                        disabled={isCreating}
                    >
                        {isCreating ? 'Creating...' : 'Create'}
                    </button>
                    <div className="space-y-2">
                        <p className="text-center">
                            Want to join an active meeting?{' '}
                            <Link
                                to="/"
                                className="text-buttonHoverColor-light hover:text-buttonHoverColor-dark"
                            >
                                <u>Join Now</u>
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

export default CreateForm;
