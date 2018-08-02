var socket = io();

socket.on('connect',  function () {  //arrow function not supported except in Chrome
  console.log('Connected to server');


});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('newMessage', function(message) {
  console.log('New message', message);
});
