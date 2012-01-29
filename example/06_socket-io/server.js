
var express = require('express');
var app = express.createServer();
var io = require('socket.io').listen(app);

var port = 9001;

// Server browser js and cursor image
app.use(express.static(__dirname + '/public'));

// Collection of connected clients
var clients = {};

io.sockets.on('connection', function(socket) { 
  var id = socket.id;
  clients[id] = socket; // Add connection to list

  socket.on('move', function(data) {
    sendToPeers(id, 'peer move', {'id': id, 'x': data.x, 'y': data.y});
  });

  socket.on('disconnect', function(socket) {
    delete clients[id]; // Remove conection from list
    sendToPeers(id, 'peer disconnect', {'id': id});
  });
});

app.listen(port);
console.log('Listening on %d', port);

// Helper function to handle relaying data to peers
function sendToPeers(ownId, event, message) {
  for(id in clients) {
    if(id === ownId) {
      continue;
    }

    clients[id].emit(event, message);
  }
}