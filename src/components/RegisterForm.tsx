import { Link } from 'react-router-dom';
import { RegisterFormProps } from '../DTO/dto';

const RegisterForm: React.FC<RegisterFormProps> = ({
    handleSubmit,
    handleFileChange,
    name,
    email,
    password,
    phone,
    countryCode,
    gender,
    dob,
    address,
    country,
    setName,
    setEmail,
    setPassword,
    setPhone,
    setCountryCode,
    setGender,
    setDob,
    setAddress,
    setCountry,
    setShowPassword,
    showPassword,
    isRegistering,
    available_genders,
}) => {
    const toggelePasswordView = () => {
        setShowPassword(!showPassword);
    };
    return (
        <div className="h-full flex items-center justify-center mx-4 md:mx-2">
            <div
                id="cardContainer"
                className="p-8 bg-cardBackgroundColor-light dark:bg-cardBackgroundColor-dark rounded-lg shadow-lg sm:w-full sm:max-w-md"
            >
                <div className="text-left">
                    <h2 className="text-4xl font-dst text-center font-libre_baskerville text-headlineColor-light dark:text-headlineColor-dark">
                        Sign Up
                    </h2>
                    <p className="mt-3 text-center text-lg font-semibold text-suggestionColor-light dark:text-suggestionColor-dark">
                        Let’s get you started. Your journey starts here!
                    </p>
                </div>

                <form
                    id="signup"
                    className="space-y-10"
                    onSubmit={handleSubmit}
                >
                    <div className="flex flex-col mt-8 space-y-4">
                        <div>
                            <label
                                htmlFor="profile_picture"
                                className="block font-medium text-suggestionColor-light dark:text-suggestionColor-dark"
                            >
                                Profile Picture
                            </label>
                            <input
                                type="file"
                                id="profile_picture"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="w-full mt-1 px-4 py-2 bg-textInputBackgroundColor-light dark:bg-textInputBackgroundColor-dark border border-textInputBorderColor-light dark:border-textInputBorderColor-dark rounded-lg shadow-sm focus:ring-2 text-suggestionColor-light dark:text-suggestionColor-dark focus:ring-textInputRingColor-light dark:focus:ring-textInputRingColor-dark"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="full_name"
                                className="block font-medium text-suggestionColor-light dark:text-suggestionColor-dark"
                            >
                                Full Name
                            </label>
                            <input
                                required
                                type="text"
                                id="full_name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Ex: John Doe"
                                className="w-full mt-1 px-4 py-2 bg-textInputBackgroundColor-light dark:bg-textInputBackgroundColor-dark border border-textInputBorderColor-light dark:border-textInputBorderColor-dark rounded-lg shadow-sm focus:ring-2 text-suggestionColor-light dark:text-suggestionColor-dark focus:ring-textInputRingColor-light dark:focus:ring-textInputRingColor-dark"
                                disabled={isRegistering}
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="email_address"
                                className="block  font-medium text-suggestionColor-light dark:text-suggestionColor-dark"
                            >
                                Email Address
                            </label>
                            <input
                                required
                                type="email"
                                id="email_address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Ex: john.doe@mail.com"
                                className="w-full mt-1 px-4 py-2 bg-textInputBackgroundColor-light dark:bg-textInputBackgroundColor-dark border border-textInputBorderColor-light dark:border-textInputBorderColor-dark rounded-lg shadow-sm focus:ring-2 text-suggestionColor-light dark:text-suggestionColor-dark focus:ring-textInputRingColor-light dark:focus:ring-textInputRingColor-dark"
                                disabled={isRegistering}
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="phone_number"
                                className="block font-medium text-suggestionColor-light dark:text-suggestionColor-dark"
                            >
                                Phone Number
                            </label>
                            <div className="flex space-x-2 mt-1">
                                <input
                                    type="tel"
                                    id="country_code"
                                    placeholder="+91"
                                    value={countryCode}
                                    onChange={(e) =>
                                        setCountryCode(e.target.value)
                                    }
                                    pattern="^\+\d{1,4}$"
                                    className="w-1/5 px-4 py-2 bg-textInputBackgroundColor-light dark:bg-textInputBackgroundColor-dark border border-textInputBorderColor-light dark:border-textInputBorderColor-dark rounded-lg shadow-sm focus:ring-2 text-suggestionColor-light dark:text-suggestionColor-dark focus:ring-textInputRingColor-light dark:focus:ring-textInputRingColor-dark"
                                    disabled={isRegistering}
                                />
                                <input
                                    type="tel"
                                    id="phone"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder="1234567890"
                                    pattern="\d{5}\s?\d{5}"
                                    className="w-4/5 px-4 py-2 bg-textInputBackgroundColor-light dark:bg-textInputBackgroundColor-dark border border-textInputBorderColor-light dark:border-textInputBorderColor-dark rounded-lg shadow-sm focus:ring-2 text-suggestionColor-light dark:text-suggestionColor-dark focus:ring-textInputRingColor-light dark:focus:ring-textInputRingColor-dark"
                                    disabled={isRegistering}
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="address"
                                className="block font-medium text-suggestionColor-light dark:text-suggestionColor-dark"
                            >
                                Address
                            </label>
                            <input
                                type="text"
                                id="address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder="Ex: 221B Baker Street, London, NW1 6XE"
                                className="w-full mt-1 px-4 py-2 bg-textInputBackgroundColor-light dark:bg-textInputBackgroundColor-dark border border-textInputBorderColor-light dark:border-textInputBorderColor-dark rounded-lg shadow-sm focus:ring-2 text-suggestionColor-light dark:text-suggestionColor-dark focus:ring-textInputRingColor-light dark:focus:ring-textInputRingColor-dark"
                                disabled={isRegistering}
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="country"
                                className="block font-medium text-suggestionColor-light dark:text-suggestionColor-dark"
                            >
                                Country
                            </label>
                            <input
                                type="text"
                                id="country"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                placeholder="Ex: CzechoSlovakia"
                                className="w-full mt-1 px-4 py-2 bg-textInputBackgroundColor-light dark:bg-textInputBackgroundColor-dark border border-textInputBorderColor-light dark:border-textInputBorderColor-dark rounded-lg shadow-sm focus:ring-2 text-suggestionColor-light dark:text-suggestionColor-dark focus:ring-textInputRingColor-light dark:focus:ring-textInputRingColor-dark"
                                disabled={isRegistering}
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="dob"
                                className="block font-medium text-suggestionColor-light dark:text-suggestionColor-dark"
                            >
                                Date of Birth
                            </label>

                            <input
                                type="text"
                                id="dob"
                                placeholder="Ex: 1990-01-01"
                                value={dob}
                                onChange={(e) => setDob(e.target.value)}
                                className="w-full mt-1 px-4 py-2 bg-textInputBackgroundColor-light dark:bg-textInputBackgroundColor-dark border border-textInputBorderColor-light dark:border-textInputBorderColor-dark rounded-lg shadow-sm focus:ring-2 text-suggestionColor-light dark:text-suggestionColor-dark focus:ring-textInputRingColor-light dark:focus:ring-textInputRingColor-dark"
                                disabled={isRegistering}
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="gender"
                                className="block font-medium text-suggestionColor-light dark:text-suggestionColor-dark"
                            >
                                Gender
                            </label>
                            <div className="mt-1 pe-4 py-2 flex justify-between space-x-2">
                                {available_genders.map((item) => (
                                    <label
                                        key={item}
                                        className={`inline-flex items-center ${isRegistering ? 'cursor-auto' : 'cursor-pointer'} mt-1 px-4 py-2 bg-textInputBackgroundColor-light dark:bg-textInputBackgroundColor-dark border border-textInputBorderColor-light dark:border-textInputBorderColor-dark rounded-lg shadow-sm focus:ring-2`}
                                    >
                                        <input
                                            type="radio"
                                            name="gender"
                                            checked={gender === item}
                                            onChange={() => setGender(item)}
                                            className="form-radio"
                                            disabled={isRegistering}
                                        />
                                        <span className="ml-2 block font-medium text-suggestionColor-light dark:text-suggestionColor-dark">
                                            {item}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between items-center">
                                <label
                                    htmlFor="password"
                                    className="block font-medium text-suggestionColor-light dark:text-suggestionColor-dark"
                                >
                                    Password
                                </label>
                                <span
                                    onClick={
                                        !isRegistering
                                            ? toggelePasswordView
                                            : undefined
                                    }
                                    className={`text-buttonHoverColor-light dark:text-buttonHoverColor-light ${isRegistering ? 'cursor-not-allowed' : 'cursor-pointer'} hover:text-buttonHoverColor-light dark:hover:text-buttonHoverColor-dark`}
                                >
                                    {showPassword ? 'Hide' : 'Show'}
                                </span>
                            </div>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                required
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Ex: password@123"
                                className="w-full mt-1 px-4 py-2 bg-textInputBackgroundColor-light dark:bg-textInputBackgroundColor-dark border border-textInputBorderColor-light dark:border-textInputBorderColor-dark rounded-lg shadow-sm focus:ring-2 text-suggestionColor-light dark:text-suggestionColor-dark focus:ring-textInputRingColor-light dark:focus:ring-textInputRingColor-dark"
                                disabled={isRegistering}
                            />
                        </div>
                    </div>

                    <button
                        id="register-button"
                        type="submit"
                        className={`w-full py-3 bg-buttonColor-light dark:bg-buttonColor-light uppercase hover:bg-buttonHoverColor-light dark:hover:bg-buttonHoverColor-dark ${isRegistering ? 'cursor-not-allowed' : 'cursor-pointer'} font-semibold rounded-md shadow-md transition duration-200 text-headlineColor-dark`}
                        disabled={isRegistering}
                    >
                        {isRegistering ? 'Signing up...' : 'Submit'}
                    </button>

                    <div className="space-y-2">
                        <p className="text-center">
                            Already have an account?{' '}
                            {isRegistering ? (
                                <span
                                    className={`text-buttonHoverColor-light dark:text-buttonHoverColor-light cursor-not-allowed`}
                                >
                                    <u>Login Here</u>
                                </span>
                            ) : (
                                <Link
                                    className={`text-buttonHoverColor-light dark:text-buttonHoverColor-light cursor-pointer hover:text-buttonHoverColor-light dark:hover:text-buttonHoverColor-dark`}
                                    to="/login"
                                >
                                    <u>Login Here</u>
                                </Link>
                            )}
                        </p>
                        <div className="flex items-center">
                            <hr className="flex-grow border-t border-gray-300" />
                            <p className="mx-4 text-gray-500">or</p>
                            <hr className="flex-grow border-t border-gray-300" />
                        </div>
                        <p className="text-center">
                            Want to register later?{' '}
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

export default RegisterForm;
