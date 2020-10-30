'use strict';

/**
 * An asynchronous bootstrap function that runs before
 * your application gets started.
 *
 * This gives you an opportunity to set up your data model,
 * run jobs, or perform some special logic.
 *
 * See more details here: https://strapi.io/documentation/v3.x/concepts/configurations.html#bootstrap
 */
const socketioJwt = require('socketio-jwt');
let connectedSockets = 0;
module.exports = async () => {
    process.nextTick(() =>{
      var io = require('socket.io')(strapi.server);
      io.sockets
      .on('connection', socketioJwt.authorize({
        secret: process.env.JWT_SECRET,
        timeout: 15000 // 15 seconds to send the authentication message
      }))
      .on('authenticated', function(socket) {
        connectedSockets++;
        console.log(`New authenticated socket! ${connectedSockets} connected`);
        socket.on('scroll', msg => socket.broadcast.emit('scroll', msg));
        socket.on('slideChange', msg => socket.broadcast.emit('slideChange', msg));
        socket.on('play', msg => socket.broadcast.emit('play', msg));
        socket.on('disconnect', () => connectedSockets--);
      });
      
      const adminNamespace = io.of('/admin');

      adminNamespace.on('connection', socket => {
        socket.emit('hi');
        socket.on('test', () => console.log("response"));
      });
      strapi.adminIo = adminNamespace; // register socket io inside strapi main object if we want to use it globally anywhere
    });

    strapi.server.timeout = 0;
  
  };