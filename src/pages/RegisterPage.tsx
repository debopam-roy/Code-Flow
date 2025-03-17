import { FormEvent, useEffect, useState } from 'react';
import { registerService } from '../ApiService/RegistrationService';
import RegisterForm from '../components/RegisterForm';
import { registerDto } from '../DTO/dto';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { getUserDetailsService } from '../ApiService/UserDetailsService';

const RegisterPage = () => {
    const navigate = useNavigate();
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [countryCode, setCountryCode] = useState<string>('+91');
    const [gender, setGender] = useState<string>('Male');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [isRegistering, setIsRegistering] = useState<boolean>(false);
    const [dob, setDob] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [country, setCountry] = useState<string>('');
    const [profilePicture, setProfilePicture] = useState<File | null>(null);

    const available_genders = ['Male', 'Female', 'Others'];

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const user_details = await getUserDetailsService();
                if (user_details) {
                    toast.success('User is already logged in.');
                    navigate('/');
                }
            } catch (error: any) {}
        };
        fetchUserDetails();
    }, [navigate]);

    const resetForm = () => {
        setName('');
        setEmail('');
        setPassword('');
        setPhone('');
        setCountryCode('');
        setGender('');
        setDob('');
        setAddress('');
        setCountry('');
        setProfilePicture(null); // Reset profile picture if needed
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsRegistering(true);

        const user_payload = {
            name,
            email,
            password,
            phone: countryCode + phone,
            gender,
            dob,
            address,
            country,
        };
        console.log(user_payload);

        try {
            await handleFormSubmit(user_payload, profilePicture);
            resetForm();
        } catch (error) {
            console.error('Form submission failed', error);
        } finally {
            setIsRegistering(false);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setProfilePicture(file);
        } else {
            setProfilePicture(null);
        }
    };

    const handleFormSubmit = async (
        userPayload: registerDto,
        profile_picture: File | null
    ) => {
        try {
            const response = await registerService(
                userPayload,
                profile_picture
            );

            if (response.data.success) {
                toast.success(
                    'Registration successful! Please confirm the OTP...'
                );
                navigate(`/verify`, {
                    state: { email: userPayload.email },
                });
            } else {
                toast.error('Something went wrong, please try again later.');
            }
        } catch (error: any) {
            toast.error(
                error.message || 'Registration failed, please try again.'
            );
        }
    };

    return (
        <div className="min-h-full w-full py-10">
            <RegisterForm
                handleSubmit={handleSubmit}
                handleFileChange={handleFileChange}
                name={name}
                email={email}
                password={password}
                phone={phone}
                countryCode={countryCode}
                gender={gender}
                dob={dob}
                address={address}
                country={country}
                setName={setName}
                setEmail={setEmail}
                setPassword={setPassword}
                setPhone={setPhone}
                setCountryCode={setCountryCode}
                setGender={setGender}
                setDob={setDob}
                setAddress={setAddress}
                setCountry={setCountry}
                setShowPassword={setShowPassword}
                showPassword={showPassword}
                isRegistering={isRegistering}
                available_genders={available_genders}
            />
        </div>
    );
};

export default RegisterPage;
