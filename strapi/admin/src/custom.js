import socketio from 'socket.io-client';

const socket = socketio('/admin');
console.log(strapi);
window.socket = socket;
socket.on('uploadprogress', () => console.log("test"));

