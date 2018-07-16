var socket = io();


$('.init').hide();
$('.game').hide();

$(document).ready(function() {
  var viewController = new ViewController();
});

/*socket.on('chat message', function(msg){
  $('body').append($('<li>').text(msg));
});*/
