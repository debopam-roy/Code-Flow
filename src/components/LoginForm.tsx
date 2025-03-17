import { Link } from 'react-router-dom';
import { LoginFormProps } from '../DTO/dto';

const LoginForm: React.FC<LoginFormProps> = ({
    email,
    password,
    isLoggingIn,
    showPassword,
    togglePasswordVisibility,
    handleSubmit,
    handleEmailChange,
    handlePasswordChange,
}) => {
    return (
        <div className="h-full flex items-center justify-center px-4 md:px-1">
            <div
                id="cardContainer"
                className="p-8 bg-cardBackgroundColor-light dark:bg-cardBackgroundColor-dark rounded-lg shadow-lg sm:w-full sm:max-w-md"
            >
                <div className="text-left">
                    <h2 className="text-4xl text-center font-dst text-headlineColor-light dark:text-headlineColor-dark">
                        Sign In
                    </h2>
                    <p className="mt-3 text-center font-semibold text-suggestionColor-light text-lg dark:text-suggestionColor-dark">
                        Welcome back. We're glad to see you again!
                    </p>
                </div>
                <form
                    id="signin"
                    className="space-y-10"
                    onSubmit={handleSubmit}
                >
                    <div className="flex flex-col mt-8 space-y-4">
                        <div>
                            <label
                                htmlFor="email_address"
                                className="block text-suggestionColor-light dark:text-suggestionColor-dark"
                            >
                                Email Address
                            </label>
                            <input
                                required
                                type="email"
                                id="email_address"
                                value={email}
                                onChange={handleEmailChange}
                                placeholder="Ex: john.doe@mail.com"
                                className="w-full mt-1 px-4 py-2 bg-textInputBackgroundColor-light dark:bg-textInputBackgroundColor-dark border border-textInputBorderColor-light dark:border-textInputBorderColor-dark rounded-lg shadow-sm focus:ring-2 
                                  text-suggestionColor-light dark:text-suggestionColor-dark
                                  focus:ring-textInputRingColor-light dark:focus:ring-textInputRingColor-dark"
                                disabled={isLoggingIn}
                            />
                        </div>

                        <div>
                            <div className="flex justify-between items-center">
                                <label
                                    htmlFor="password"
                                    className="block text-suggestionColor-light dark:text-suggestionColor-dark"
                                >
                                    Password
                                </label>
                                <span
                                    onClick={
                                        !isLoggingIn
                                            ? togglePasswordVisibility
                                            : undefined
                                    }
                                    className={`text-buttonHoverColor-light dark:text-buttonHoverColor-light ${isLoggingIn ? 'cursor-not-allowed' : 'cursor-pointer'} hover:text-buttonHoverColor-light dark:hover:text-buttonHoverColor-dark`}
                                >
                                    {showPassword ? 'Hide' : 'Show'}
                                </span>
                            </div>
                            <input
                                required
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                value={password}
                                onChange={handlePasswordChange}
                                placeholder="Ex: password@123"
                                className="w-full mt-1 px-4 py-2 bg-textInputBackgroundColor-light dark:bg-textInputBackgroundColor-dark border border-textInputBorderColor-light dark:border-textInputBorderColor-dark rounded-lg shadow-sm focus:ring-2 
                                  text-suggestionColor-light dark:text-suggestionColor-dark
                                  focus:ring-textInputRingColor-light dark:focus:ring-textInputRingColor-dark"
                                disabled={isLoggingIn}
                            />
                        </div>
                    </div>

                    <button
                        id="login-button"
                        type="submit"
                        className={`w-full py-3 bg-buttonColor-light dark:bg-buttonColor-light uppercase hover:bg-buttonHoverColor-light dark:hover:bg-buttonHoverColor-dark ${isLoggingIn ? 'cursor-not-allowed' : 'cursor-pointer'} font-semibold rounded-md shadow-md transition duration-200 text-headlineColor-dark`}
                        disabled={isLoggingIn}
                    >
                        {isLoggingIn ? 'Logging in...' : 'Submit'}
                    </button>

                    <div className="space-y-2">
                        <p className="text-center">
                            Don't have an account?{' '}
                            {isLoggingIn ? (
                                <span className="text-buttonHoverColor-light cursor-not-allowed">
                                    <u>Register Here</u>
                                </span>
                            ) : (
                                <Link
                                    to="/register"
                                    className="text-buttonHoverColor-light hover:text-buttonHoverColor-dark"
                                >
                                    <u>Register Here</u>
                                </Link>
                            )}
                        </p>

                        <div className="flex items-center">
                            <hr className="flex-grow border-t border-gray-300" />
                            <p className="mx-4 text-gray-500">or</p>
                            <hr className="flex-grow border-t border-gray-300" />
                        </div>
                        <p className="text-center">
                            Want to sign-in later?{' '}
                            <Link
                                to="/"
                                className="text-buttonHoverColor-light hover:text-buttonHoverColor-dark"
                            >
                                <u>Skip Authentication</u>
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
