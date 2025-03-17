import { io, Socket } from 'socket.io-client';

class SocketManager {
    private sockets: Map<string, Socket>;
    private static instance: SocketManager;
    private namespaces: string[] = ['members', 'editor', 'chat'];

    private constructor() {
        this.sockets = new Map();
        this.initializeSockets();
    }

    public static getInstance(): SocketManager {
        if (!SocketManager.instance) {
            SocketManager.instance = new SocketManager();
        }
        return SocketManager.instance;
    }

    // Initialize sockets for each namespace
    private initializeSockets(): void {
        this.namespaces.forEach((namespace) => {
            const socket = io(`http://localhost:3000/${namespace}`, {
                transports: ['websocket'],
            });

            socket.on('connect', () => {
                console.log(`${namespace} -> Connected with ID: ${socket.id}`);
            });

            socket.on('connect_error', (err) => {
                console.error(
                    `${namespace} -> Connection failed: ${err.message}`
                );
            });

            this.sockets.set(namespace, socket);
        });
    }

    // Retrieve a specific socket instance
    public getSocket(namespace: string): Socket | undefined {
        return this.sockets.get(namespace);
    }

    // Disconnect socket for a given namespace
    public disconnect(namespace: string): void {
        const socket = this.sockets.get(namespace);
        if (socket) {
            socket.disconnect();
            this.sockets.delete(namespace);
            console.log(`${namespace} -> Disconnected`);
        }
    }

    // Disconnect all sockets
    public disconnectAll(): void {
        this.sockets.forEach((socket, namespace) => {
            socket.disconnect();
            console.log(`${namespace} -> Disconnected`);
        });
        this.sockets.clear();
    }
}

export default SocketManager;
