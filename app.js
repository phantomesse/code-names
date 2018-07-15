const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const sassMiddleware = require('node-sass-middleware')
const path = require('path');
const GameSession = require('./app/game-session.js');
const port = process.env.PORT || 1337; 

/// List of active game sessions.
var gameSessions = [];

// SASS compilations.
app.use(sassMiddleware({
  debug: true,
  dest: 'public/css',
  force: true, 
  outputStyle: 'compressed',
  prefix: '/css',
  root: __dirname,
  sourceMap: true,
  src: 'sass'
}));
app.use(express.static(path.join(__dirname, 'public')));

// Serve index.html.
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/public/index.html');
});

// Check if a game session exists based on a given session name.
app.get('/game-session-exists', function(request, response) {
  var sessionName = request.query.sessionName;
  var exists = false;

  if (sessionName != undefined) {
    for (var i = 0; i < gameSessions.length; i++) {
      if (gameSessions[i].sessionName === sessionName) {
        exists = true;
        break;
      }
    }
  }

  response.setHeader('Content-Type', 'application/json');
  response.send(JSON.stringify({'exists': exists}));
});

// Handle socket.io connections.
io.on('connection', function(socket) {
  console.log('a user connected');

  socket.on('disconnect', function() {
    console.log('user disconnected');
  });

  socket.on('join session name', function(sessionName) {
//    io.emit('chat message', msg);
    var session = new GameSession(sessionName);
    gameSessions.push(session);
    console.log(gameSessions);
  });
});

// Start up server.
http.listen(port, function(){
  console.log(`listening on localhost:${port}`);
});
