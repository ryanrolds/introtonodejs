var socket = io.connect(window.location.href);

// Listen for mouse moves and send them to the server
$(document).one('ready', function() {
  $(document).mousemove(function(event) {
    socket.emit('move', {'x': event.pageX, 'y': event.pageY});
  });
});

// Handle peer movements
socket.on('peer move', function(data) {
  // Get the cursor
  var cursor = ($('#cursor_' + data.id).length) ? $('#cursor_' + data.id)[0] : null;

  if(cursor === null) {
    // Create element
    cursor = document.createElement('div');
    cursor.id = 'cursor_' + data.id;
    cursor.className = 'cursor';

    // Add to document
    document.getElementsByTagName('body')[0].appendChild(cursor);
    updateTitle();
  }

  // Set position
  cursor.style.left = data.x + 'px';
  cursor.style.top = data.y + 'px';
});

// Handle disconnects
socket.on('peer disconnect', function(data) {
  $('#cursor_' + data.id).remove();
  updateTitle();
});

function updateTitle() {
    document.title = + $('.cursor').length + ' user(s) :: Socket.io demo';
}