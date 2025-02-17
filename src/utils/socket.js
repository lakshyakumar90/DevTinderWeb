import io from 'socket.io-client';
import { BASE_URL } from './constants/constants';

let socket;

export const createSocketConnection = () => {
    if (!socket) {
        socket = io(BASE_URL, {
            withCredentials: true,
        });
        socket.on("connect", () => console.log("Connected to Socket.io server"));
        socket.on("disconnect", () => console.log("Disconnected from server"));
    }
    return socket;
}