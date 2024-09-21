import { Server } from 'socket.io'

let io: Server;

export const initializeSocket = (server: any) => {
    io = new Server(server, {
        cors: {
            origin: "*"
        },
        pingInterval: 10000,
        pingTimeout: 5000
    })

    io.on('connect', (socket) => {
        console.log("A user connect", socket.id);

        socket.on("disconnect", () => {
            console.log("User Disconnected", socket.id);
        });
    })
}

export const getIO = () => {
    if (!io) {
        throw new Error('Socket.io has not been initialized.')
    }

    return io;
}

