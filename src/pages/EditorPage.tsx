import { useEffect, useState, useRef } from 'react';
import * as Y from 'yjs';
import { WebrtcProvider } from 'y-webrtc';
import { MonacoBinding } from 'y-monaco';
import CodeEditor from '../components/CodeEditor';
import SocketManager from '../server/SocketManager';
import EditorTab from '../components/EditorTab';
import toast from 'react-hot-toast';

interface RoomDetails {
    roomId: string;
    user_name: string;
}

const EditorPage = ({ roomDetails }: { roomDetails: RoomDetails }) => {
    const [theme, setTheme] = useState<string>('light');
    const editorRef = useRef<any>(null);
    const ydocRef = useRef<Y.Doc | null>(null);
    const providerRef = useRef<WebrtcProvider | null>(null);
    const socketRef = useRef(SocketManager.getInstance().getSocket('editor'));
    const [openedTabs, setOpenedTabs] = useState([
        {
            name: 'automator.jsx',
            icon: '/assets/icons/jsx.png',
            selected: true,
        },
        {
            name: 'config.py',
            icon: '/assets/icons/python.png',
            selected: false,
        },
        {
            name: 'readme.md',
            icon: '/assets/icons/md.png',
            selected: false,
        },
        {
            name: 'ddl.txt',
            icon: '/assets/icons/txt.png',
            selected: false,
        },
        
    ]);

    useEffect(() => {
        const isDarkMode = document.documentElement.classList.contains('dark');
        setTheme(isDarkMode ? 'vs-dark' : 'light');

        const observer = new MutationObserver(() => {
            const isDarkModeNow =
                document.documentElement.classList.contains('dark');
            setTheme(isDarkModeNow ? 'vs-dark' : 'light');
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class'],
        });

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const editorSocket = socketRef.current;
        if (!editorSocket) return;

        const handleConnect = () => {
            console.log('Connected to editor namespace');
            editorSocket.emit('joinRoom', roomDetails);
        };

        const handleCodeSnippet = (code: string) => {
            if (ydocRef.current) {
                ydocRef.current
                    .getText('monaco')
                    .delete(0, ydocRef.current.getText('monaco').length);
                ydocRef.current.getText('monaco').insert(0, code);
            }
        };

        const handleUserJoined = (user: {
            user_name: string;
            socket_id: string;
        }) => {
            console.log(`${user.user_name} joined the room.`);
        };

        const handleUserLeft = (user: { user_name: string }) => {
            console.log(`${user.user_name} left the room.`);
        };

        editorSocket.on('connect', handleConnect);
        editorSocket.on('code_snippet', handleCodeSnippet);
        editorSocket.on('user_joined', handleUserJoined);
        editorSocket.on('user_left', handleUserLeft);

        return () => {
            editorSocket.off('connect', handleConnect);
            editorSocket.off('code_snippet', handleCodeSnippet);
            editorSocket.off('user_joined', handleUserJoined);
            editorSocket.off('user_left', handleUserLeft);
        };
    }, [roomDetails]);

    const handleEditorMount = (editor: any) => {
        editorRef.current = editor;
        editor.focus();

        const ydoc = new Y.Doc();
        const provider = new WebrtcProvider(roomDetails.roomId, ydoc);

        const type = ydoc.getText('monaco');
        new MonacoBinding(
            type,
            editor.getModel(),
            new Set([editor]),
            provider.awareness
        );

        ydocRef.current = ydoc;
        providerRef.current = provider;

        const socket = socketRef.current;
        if (!socket) return;

        provider.signalingConns.forEach((signaling) => {
            signaling.on('message', (message: any) => {
                socket.emit('code_update', {
                    roomId: roomDetails.roomId,
                    latest_code: message,
                });
            });
        });

        const beforeUnloadHandler = () => {
            console.log('Disconnecting sockets...');
            SocketManager.getInstance().disconnectAll();
        };

        window.addEventListener('beforeunload', beforeUnloadHandler);

        return () => {
            window.removeEventListener('beforeunload', beforeUnloadHandler);
            SocketManager.getInstance().disconnectAll();
        };
    };

    const handleTabSelect = (selectedIndex: number) => {
        setOpenedTabs((prevTabs) =>
            prevTabs.map((tab, index) =>
                index === selectedIndex
                    ? { ...tab, selected: true }
                    : { ...tab, selected: false }
            )
        );
    };

    const handleTabClose = (selectedIndex: number) => {
        setOpenedTabs((prevTabs) => {
            if (prevTabs.length === 1) {
                toast.error('Atleast one tab should be open.');
                return prevTabs;
            }

            const newTabs = prevTabs.filter(
                (_, index) => index !== selectedIndex
            );

            if (prevTabs[selectedIndex].selected) {
                const newSelectedIndex =
                    selectedIndex >= newTabs.length
                        ? newTabs.length - 1
                        : selectedIndex;
                newTabs[newSelectedIndex] = {
                    ...newTabs[newSelectedIndex],
                    selected: true,
                };
            }

            return newTabs;
        });
    };

    return (
        <div className=" h-full w-full bg-cardBackgroundColor-light dark:bg-[#1E1E1E] rounded-lg shadow">
            <div className="flex flex-row gap-x-[4px] border-b-[1px] border-[#cfcfcf] dark:border-[#2b2b2b] overflow-x-auto scrollbar-thin scrollbar-track-green-400">
                {openedTabs.length > 0 &&
                    openedTabs.map((tab, index) => (
                        <EditorTab
                            key={index}
                            name={tab.name}
                            icon={tab.icon}
                            selected={tab.selected}
                            onClick={() => handleTabSelect(index)}
                            onClose={() => handleTabClose(index)}
                        />
                    ))}
            </div>
            <CodeEditor theme={theme} handleEditorMount={handleEditorMount} />
        </div>
    );
};

export default EditorPage;
