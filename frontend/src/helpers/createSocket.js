import io from 'socket.io-client'
export const createSocket = () => new Promise ((resolve,reject) => {
    const socket = io(process.env.VUE_APP_SOCKETS_URL);
    socket
        .emit('authenticate', { token: localStorage.getItem('STRAPI_TOKEN') }) //send the jwt
        .on('authenticated', () => {
            resolve(socket);
        })
        .on('unauthorized', (msg) => {
            console.log(`unauthorized: ${JSON.stringify(msg.data)}`);
            throw new Error(msg.data.type);
        });
});