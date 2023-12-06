import {io} from  'socket.io-client';

const initSocket = async () => {
    return io.connect("http://192.168.0.102:4001");
};


export default initSocket;
