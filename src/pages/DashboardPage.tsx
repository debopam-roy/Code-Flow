import { useEffect, useState, useCallback } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { PanelGroup, Panel, PanelResizeHandle } from 'react-resizable-panels';
import SectionHeader from '../components/SectionHeader';
import EditorPage from './EditorPage';
import { getRoomDetailsService } from '../ApiService/RoomsDetailsService';
import MembersPage from './MembersPage';
import RulesPage from './RulesPage';
import ChatPage from './ChatPage';

type RoomDetails = {
    roomName: string;
    roomId: string;
    user_id: string;
    user_name: string;
    profile_picture: string;
    owner: string;
    description: string;
    guidelines: string;
};

type CollapsedState = {
    member: boolean;
    directories: boolean;
    terminal: boolean;
    rules: boolean;
    chat: boolean;
};

const DashboardPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { roomId } = useParams<{ roomId: string }>();

    const [roomDetails, setRoomDetails] = useState<RoomDetails>({
        roomName: '',
        roomId: '',
        user_id: '',
        user_name: '',
        profile_picture: '',
        owner: '',
        description: '',
        guidelines: '',
    });

    const [divCollapsed, setDivCollapsed] = useState<CollapsedState>({
        member: false,
        directories: false,
        terminal: false,
        rules: false,
        chat: false,
    });

    const fetchRoomDetails = useCallback(async () => {
        if (!roomId || !location.state) {
            toast.error('Invalid Room ID or Missing User Details!');
            navigate('/');
            return;
        }

        try {
            const { user_id, user_name, profile_picture } = location.state as {
                user_id: string;
                user_name: string;
                profile_picture: string;
            };
            const { roomName, owner, description, guidelines } =
                await getRoomDetailsService(roomId);

            setRoomDetails({
                roomName,
                roomId,
                user_id,
                user_name,
                profile_picture,
                owner,
                description,
                guidelines,
            });
        } catch (error) {
            console.error('Error fetching room details:', error);
            toast.error('Failed to load room details.');
            navigate('/');
        }
    }, [roomId, location.state, navigate]);

    useEffect(() => {
        fetchRoomDetails();
    }, [fetchRoomDetails]);

    return (
        <PanelGroup
            direction="horizontal"
            className="flex h-full flex-1 p-2 gap-1 text-headlineColor-light dark:text-headlineColor-dark"
        >
            {/* Left Panel */}
            <Panel defaultSize={25} minSize={5} className="h-full">
                <PanelGroup
                    direction="vertical"
                    className="flex flex-col space-y-2"
                    
                >
                    <div className="flex flex-1 flex-col space-y-1">
                        <Panel
                            collapsible = {true}
                            onResize={(size:number)=>{
                                if(size <= 12){
                                    setDivCollapsed((prevState) => ({
                                        ...prevState,
                                        member: !prevState.member,
                                    }))
                                    
                                }
                            }}
                            defaultSize={45}
                            maxSize={88}
                            className="flex flex-col shadow p-4 h-full w-full bg-cardBackgroundColor-light dark:bg-cardBackgroundColor-dark rounded-lg gap-y-3 overflow-hidden"
                            
                        >
                            <SectionHeader
                                title="Connected Members"
                                collapsed={divCollapsed.member}
                                onCollapseButtonClick={() =>
                                    setDivCollapsed((prevState) => ({
                                        ...prevState,
                                        member: !prevState.member,
                                    }))
                                }
                            />

                            <div className={`shadow rounded-lg overflow-auto bg-subSection-light dark:bg-subSection-dark transition-all duration-200 ${divCollapsed.member ? "h-0 opacity-0 pointer-events-none" : "flex-1"}`}>
                                <MembersPage roomDetails={roomDetails} />
                            </div>
                        
                        </Panel>
                        <PanelResizeHandle />
                        <Panel
                            defaultSize={55}
                            maxSize={88}
                            className="flex flex-col shadow p-4 h-full w-full bg-cardBackgroundColor-light dark:bg-cardBackgroundColor-dark rounded-lg gap-y-3 overflow-hidden"
                        >
                            <SectionHeader
                                title="Folder Structure"
                                collapsed={divCollapsed.directories}
                                onCollapseButtonClick={() =>
                                    setDivCollapsed((prevState) => ({
                                        ...prevState,
                                        directories: !prevState.directories,
                                    }))
                                }
                            />
                            <div className={`shadow rounded-lg overflow-auto bg-subSection-light dark:bg-subSection-dark transition-all duration-200 ${divCollapsed.directories ? "h-0 opacity-0 pointer-events-none" : "flex-1"}`}>
                                <p>Meme</p>
                            </div>
                        </Panel>
                    </div>
                    <div className="flex flex-col justify-evenly items-center gap-y-2">
                            <button
                                className="px-4 py-2 w-5/6 bg-green-500 text-white hover:bg-green-600 shadow-lg rounded-md"
                                onClick={() => {
                                    navigator.clipboard.writeText(
                                        roomDetails.roomId
                                    );
                                    toast.success('Room ID copied!');
                                }}
                                aria-label="Copy Room ID"
                            >
                                Copy Room ID
                            </button>

                            <button
                                className="px-4 py-2 w-5/6 bg-red-500 text-white hover:bg-red-600 shadow-lg rounded-md"
                                aria-label="Exit Meeting"
                                onClick={() => navigate('/')}
                            >
                                Exit Meeting
                            </button>
                    </div>
                    
                </PanelGroup>
            </Panel>

            <PanelResizeHandle />

            {/* Center Panel */}
            <Panel defaultSize={50} minSize={5} className=" h-full">
                <PanelGroup
                    direction="vertical"
                    className="flex flex-col flex-1 space-y-1"
                >
                    <Panel
                        minSize={20}
                        defaultSize={70}
                        className="flex-[2] shadow rounded-lg "
                    >
                        <EditorPage roomDetails={roomDetails} />
                    </Panel>
                    <PanelResizeHandle />
                    <Panel
                        defaultSize={30}
                        maxSize={90}
                        className="flex flex-col shadow p-4 h-full w-full bg-cardBackgroundColor-light dark:bg-cardBackgroundColor-dark rounded-lg gap-y-3 overflow-hidden"
                    >
                        <SectionHeader
                            title="Terminal"
                            collapsed={divCollapsed.terminal}
                            onCollapseButtonClick={() =>
                                setDivCollapsed((prevState) => ({
                                    ...prevState,
                                    terminal: !prevState.terminal,
                                }))
                            }
                        />
                        <div className={`shadow rounded-lg overflow-auto bg-subSection-light dark:bg-subSection-dark transition-all duration-200 ${divCollapsed.terminal ? "h-0 opacity-0 pointer-events-none" : "flex-1"}`}>
                            <p>Mem</p>

                        </div>
                    </Panel>
                </PanelGroup>
            </Panel>

            <PanelResizeHandle />

            {/* Right Panel */}
            <Panel defaultSize={25} minSize={5} className="h-full">
                <PanelGroup direction="vertical" className="flex flex-col space-y-1">
                    
                    <Panel
                        defaultSize={40}
                        maxSize={88}
                        className="flex flex-col shadow p-4 h-full w-full bg-cardBackgroundColor-light dark:bg-cardBackgroundColor-dark rounded-lg gap-y-3 overflow-hidden"
                    >
                        <SectionHeader
                            title="Meeting Details"
                            collapsed={divCollapsed.rules}
                            onCollapseButtonClick={() =>
                                setDivCollapsed((prevState) => ({
                                    ...prevState,
                                    rules: !prevState.rules,
                                }))
                            }
                        />
                        <div className={`shadow rounded-lg overflow-auto bg-subSection-light dark:bg-subSection-dark transition-all duration-200 ${divCollapsed.rules ? "h-0 opacity-0 pointer-events-none" : "flex-1"}`}>
                            <RulesPage
                                name={roomDetails.roomName}
                                id={roomDetails.roomId}
                                owner={roomDetails.owner}
                                description={roomDetails.description}
                                guidelines={roomDetails.guidelines}
                            />
                        </div>
                        
                    </Panel>
                    
                    <PanelResizeHandle />
                    
                    <Panel
                        defaultSize={60}
                        minSize={5}
                        maxSize={88}
                        className="flex flex-col shadow p-4 h-full w-full bg-cardBackgroundColor-light dark:bg-cardBackgroundColor-dark rounded-lg gap-y-3 overflow-hidden"
                    >
                        <SectionHeader
                            title="Chat"
                            collapsed={divCollapsed.chat}
                            onCollapseButtonClick={() =>
                                setDivCollapsed((prevState) => ({
                                    ...prevState,
                                    chat: !prevState.chat,
                                }))
                            }
                        />
                        
                        <div className={`shadow rounded-lg overflow-auto bg-subSection-light dark:bg-subSection-dark transition-all duration-200 ${
            divCollapsed.chat ? "h-0 opacity-0 pointer-events-none" : "flex-1"}`}>
                            <ChatPage roomDetails={roomDetails} />
                        </div>
                        
                    </Panel>

                </PanelGroup>
            </Panel>
        </PanelGroup>
    );
};

export default DashboardPage;
