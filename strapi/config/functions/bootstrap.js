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
module.exports = async () => {
    process.nextTick(() =>{
      var io = require('socket.io')(strapi.server);
      io.sockets
      .on('connection', socketioJwt.authorize({
        secret: process.env.JWT_SECRET,
        timeout: 15000 // 15 seconds to send the authentication message
      }))
      .on('authenticated', function(socket) {
        //this socket is authenticated, we are good to handle more events from it.
        console.log(`Hello! ${socket.decoded_token}`);
        socket.on('scroll', msg => socket.broadcast.emit('scroll', msg));
        socket.on('slideChange', msg => socket.broadcast.emit('slideChange', msg));
      });
      strapi.io = io; // register socket io inside strapi main object to use it globally anywhere
    })
  
  };