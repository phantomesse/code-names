var socket = io();

var sessionPickerInput = $('.session-picker input[type=text');
var sessionPickerButton = $('.session-picker button');

sessionPickerButton.click(function() {
  var sessionName = sessionPickerInput.val();
  socket.emit('join session name', sessionName);
});

sessionPickerInput.keyup(function() {
  var sessionName = sessionPickerInput.val();
  $.get('/game-session-exists', {'sessionName' : sessionName}, function(response) {
    if (response.exists) {
      sessionPickerButton.text('join session');
    } else {
      sessionPickerButton.text('create session');
    }
  });
});

/*socket.on('chat message', function(msg){
  $('body').append($('<li>').text(msg));
});*/
