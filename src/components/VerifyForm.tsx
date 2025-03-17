import { VerifyFormProps } from '../DTO/dto';

const VerifyForm: React.FC<VerifyFormProps> = ({
    otp,
    handleOtpChange,
    handleSubmit,
    resendOtp,
    isLoggingIn,
}) => {
    return (
        <div className="h-full flex items-center justify-center px-4 md:px-1">
            <div
                id="cardContainer"
                className="p-8 bg-cardBackgroundColor-light dark:bg-cardBackgroundColor-dark rounded-lg shadow-lg sm:w-full sm:max-w-md"
            >
                <div className="text-left">
                    <h2 className="text-4xl text-center font-dst text-headlineColor-light dark:text-headlineColor-dark">
                        Verify Email Address
                    </h2>
                    <p className="mt-3 text-center font-semibold text-suggestionColor-light text-lg dark:text-suggestionColor-dark">
                        We have sent you an OTP. Enter it below.
                    </p>
                </div>
                <form
                    id="verifyuser"
                    className="space-y-10"
                    onSubmit={handleSubmit}
                >
                    <div className="flex space-x-2 justify-center">
                        {Array(6)
                            .fill('')
                            .map((_, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    maxLength={1}
                                    value={otp[index] || ''}
                                    onChange={(e) => handleOtpChange(e, index)}
                                    className="w-12 h-12 text-center text-xl bg-textInputBackgroundColor-light dark:bg-textInputBackgroundColor-dark border border-textInputBorderColor-light dark:border-textInputBorderColor-dark rounded-lg shadow-sm focus:ring-2 text-suggestionColor-light dark:text-suggestionColor-dark focus:ring-textInputRingColor-light dark:focus:ring-textInputRingColor-dark input-no-cursor"
                                />
                            ))}
                    </div>

                    <button
                        id="login-button"
                        type="submit"
                        className={`w-full py-3 bg-buttonColor-light dark:bg-buttonColor-light uppercase hover:bg-buttonHoverColor-light dark:hover:bg-buttonHoverColor-dark ${isLoggingIn ? 'cursor-not-allowed' : 'cursor-pointer'} font-semibold rounded-md shadow-md transition duration-200 text-headlineColor-dark`}
                        disabled={isLoggingIn}
                    >
                        {isLoggingIn ? 'Verifying...' : 'Submit'}
                    </button>

                    <div className="mt-4 text-center">
                        <button
                            type="button"
                            onClick={resendOtp}
                            className="text-suggestionColor-light dark:text-suggestionColor-dark underline"
                        >
                            Didn't receive an OTP? Send it again.
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default VerifyForm;
