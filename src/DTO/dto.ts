export interface registerDto {
    name: string;
    email: string;
    password: string;
    phone: string;
    gender: string;
    dob: string;
    address: string;
    country: string;
}

export interface loginDto {
    email: string;
    password: string;
}

export interface verifyDto {
    otp: string;
    email: string | null;
}

export interface resendDto {
    email: string | null;
}

export interface createRoomDto {
    roomId: string;
    userId: string;
    roomName: string;
    roomPrivacy: string;
    roomDescription: string;
    roomGuidelines: string[];
    projectType: string;
    roomPassword: string | undefined;
}

export interface joinRoomDto {
    roomId: string;
    userId: string;
    roomPassword: string | undefined;
}

export interface activeUserDto {
    userId: string;
    userName: string;
    socketId?: string;
    profile_picture?: string;
}

export interface Member {
    user_name: string;
    socket_id: string;
    profile_picture: string;
}

export interface LobbyMembers extends Member {
    members: Member[];
    userId: string;
}

export interface JoinFormProps {
    roomId: string;
    roomType: string;
    password: string;
    user_name: string;
    isJoining: boolean;
    showPassword: boolean;
    setRoomId: (roomId: string) => void;
    togglePasswordVisibility: () => void;
    handleSubmit: (e: React.FormEvent) => void;
    setUserDetails: (userName: string) => void;
    setPassword: (password: string) => void;
    setRoomType: (roomType: string) => void;
}

export interface CreateFormProps {
    roomId: string;
    roomName: string;
    roomType: string;
    password: string;
    isCreating: boolean;
    showPassword: boolean;
    guidelineInput: string;
    roomDescription: string;
    roomGuidelines: string[];
    requirePermission: boolean;

    addGuideline: () => void;
    createNewRoom: () => void;
    setRoomId: (value: string) => void;
    setRoomName: (value: string) => void;
    togglePasswordVisibility: () => void;
    setRoomType: (value: string) => void;
    setPassword: (value: string) => void;
    removeGuideline: (index: number) => void;
    setGuidelineInput: (value: string) => void;
    handleSubmit: (e: React.FormEvent) => void;
    setRoomDescription: (value: string) => void;
    setRequirePermission: (value: boolean) => void;
}

export interface LoginFormProps {
    email: string;
    password: string;
    isLoggingIn: boolean;
    showPassword: boolean;
    togglePasswordVisibility: () => void;
    handleSubmit: (e: React.FormEvent) => void;
    handleEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handlePasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface RegisterFormProps {
    handleSubmit: (e: React.FormEvent) => void;
    handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    dob: string;
    name: string;
    email: string;
    phone: string;
    gender: string;
    address: string;
    country: string;
    password: string;
    countryCode: string;
    showPassword: boolean;
    isRegistering: boolean;
    available_genders: string[];
    setName: React.Dispatch<React.SetStateAction<string>>;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
    setPhone: React.Dispatch<React.SetStateAction<string>>;
    setCountryCode: React.Dispatch<React.SetStateAction<string>>;
    setGender: React.Dispatch<React.SetStateAction<string>>;
    setDob: React.Dispatch<React.SetStateAction<string>>;
    setAddress: React.Dispatch<React.SetStateAction<string>>;
    setCountry: React.Dispatch<React.SetStateAction<string>>;
    setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface VerifyFormProps {
    otp: string;
    handleOtpChange: (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number
    ) => void;
    handleSubmit: (e: React.FormEvent) => void;
    resendOtp: () => void;
    isLoggingIn: boolean;
}

export interface CodeChunk {
    user_id: string;
    user_name: string;
    latest_code: string;
}

export interface RulesPageProps {
    name: string;
    id: string;
    owner: string;
    description: string;
    guidelines: string;
}

export interface UserProps {
    user_name: string;
    profile_picture: string;
}

export interface ChatMessage {
    socket_id: string;
    sender: string;
    message_content: string;
    time: string;
}
