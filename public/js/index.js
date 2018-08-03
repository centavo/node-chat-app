var socket = io();

socket.on('connect',  function () {  //arrow function not supported except in Chrome
  console.log('Connected to server');


});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('newMessage', function(message) {
  console.log('New message', message);
  var li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);

  jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function (message) {
  console.log('Location', message);
  var li = jQuery('<li></li>');
  var a = jQuery('<a target="_blank">My current location</a>');
  li.text(`${message.from}: `);
//attr() with one argument (eg target) will fetch the value.  With two arguments
//it will set the value of the first with data from second
  a.attr('href', message.url);
  li.append(a);

  jQuery('#messages').append(li);
});


//need to override the default behaviour of browser to refresh page
jQuery('#message-form').on('submit', function(e) {
  e.preventDefault();
  socket.emit('createMessage', {
    from: 'User',
    text: jQuery('[name=message]').val()
  }, function () {
    console.log('this is the acknowledgement');
  });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function(e) {
  if(!navigator.geolocation) {
    return alert('Geolocation not supported by your browser.');
  }
  navigator.geolocation.getCurrentPosition(function (position) {
    socket.emit('createLocationMessage', {
      latitiude: position.coords.latitude,
      longitude: position.coords.longitude
    })
  }, function () {
    alert('Unable to fetch location');
  });
});
