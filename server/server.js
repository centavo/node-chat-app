const path = require('path');  //built in node module
const http = require('http'); // built in node module
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

//listen for an event and do something when it happens
//these are built in events
io.on('connection', (socket) => {
  console.log('New user connected');

  socket.emit('newMessage', {
    from: 'Admin',
    text: 'Welcome to the chat room',
    createdAt: new Date().getTime()
  });

  socket.broadcast.emit('newMessage', {
    from: 'Admin',
    text: 'New user joined the chat',
    createdAt: new Date().getTime()
  });

  socket.on('createMessage', (newMessage) => {
    console.log('createMessage', newMessage);
    io.emit('newMessage', {
      from: newMessage.from,
      text: newMessage.text,
      createdAt: new Date().getTime()
    });
    //socket.broadcast.emit will send message to everyone except this socket
    // socket.broadcast.emit('newMessage', {
    //   from: newMessage.from,
    //    text: newMessage.text,
    //    createdAt: new Date().getTime()
    // });
  });

  socket.on('disconnect', () => {
    console.log('Disconnected from client');
  });
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});



// code which created server in background(app.listen) which was fine before
// we needed to plug in socket.io
// app.use(express.static(publicPath));
// app.listen(port, () => {
//   console.log(`Server is up on port ${port}`);
// });



























// console.log(__dirname + '/../public');
// console.log(publicPath);
