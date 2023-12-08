import io from 'socket.io-client';

const url = 'http://localhost:3333';
const socket = io(url, { autoConnect: false });

export default socket;